import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  balance: any = null;
  loading = true;
  error = '';

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    const token = this.auth.getToken();
    if (token) {
      this.api.getBalance(token).subscribe({
        next: (res) => {
          this.balance = res;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar el reporte';
          this.loading = false;
        }
      });
    }
  }
}