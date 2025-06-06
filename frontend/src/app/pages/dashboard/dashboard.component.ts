import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  balance: any = null;
  loading = true;
  error = '';
  movimientos: any[] = [];
  usuario: any = null;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.auth.getToken();
    if (token) {
      // Obtener movimientos directamente (no hay getProfile en ApiService)
      this.api.getMovimientos(token).subscribe({
        next: (movs: any[]) => {
          this.movimientos = movs;
          if (!this.movimientos || this.movimientos.length === 0) {
            this.router.navigate(['/movimientos']);
          } else {
            // Si hay movimientos, obtener el balance/resumen
            this.api.getBalance(token).subscribe({
              next: (res) => {
                this.balance = res;
                this.loading = false;
              },
              error: () => {
                this.error = 'No se pudo cargar el balance';
                this.loading = false;
              }
            });
          }
        },
        error: () => {
          this.error = 'No se pudo cargar la información de movimientos';
          this.loading = false;
        }
      });
    }
  }
}