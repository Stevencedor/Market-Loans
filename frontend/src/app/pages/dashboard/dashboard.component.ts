import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
          this.error = 'No se pudo cargar el balance';
          this.loading = false;
        }
      });
    }
  }
}