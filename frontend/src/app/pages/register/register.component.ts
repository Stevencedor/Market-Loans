import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgIf, NavbarComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';
  success = '';
  cargando = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  register() {
    if (this.registerForm.invalid) return;
    this.cargando = true;
    this.api.register(this.registerForm.value).subscribe({
      next: () => {
        this.success = 'Registro exitoso. Ahora puedes iniciar sesión.';
        this.error = '';
        this.cargando = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.error = 'No se pudo registrar el usuario';
        this.success = '';
        this.cargando = false;
      }
    });
  }
}