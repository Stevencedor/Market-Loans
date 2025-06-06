import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgIf, NavbarComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';
  cargando = false;
  mostrarPassword = false; // Variable para controlar la visibilidad de la contraseña

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }
  
  login() {
    if (this.loginForm.invalid) return;
    this.cargando = true;
    this.api.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.cargando = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Credenciales inválidas';
        this.cargando = false;
      }
    });
  }
}