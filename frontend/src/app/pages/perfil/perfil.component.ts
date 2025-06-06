import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: any = {};
  profileForm: FormGroup;
  passwordForm: FormGroup;
  editMode: boolean = false;
  changePasswordMode: boolean = false;
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator() });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Validador personalizado para comprobar que la nueva contraseña y la confirmación coincidan
  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const newPassword = group.get('newPassword')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      return newPassword === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  loadUserProfile(): void {
    this.loading = true;
    this.apiService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.profileForm.patchValue({
          nombre: data.nombre,
          username: data.username,
          email: data.email
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user profile', error);
        this.errorMessage = 'No se pudo cargar la información del perfil';
        this.loading = false;
      }
    });
  }
  
  editProfile(): void {
    this.editMode = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  cancelEdit(): void {
    this.editMode = false;
    this.profileForm.patchValue({
      nombre: this.user.nombre,
      username: this.user.username,
      email: this.user.email
    });
  }
  
  updateProfile(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      this.apiService.updateUserProfile(this.profileForm.value).subscribe({
        next: () => {
          this.successMessage = 'Perfil actualizado correctamente';
          this.errorMessage = '';
          this.editMode = false;
          this.loading = false;
          this.loadUserProfile();
        },
        error: (error) => {
          console.error('Error updating profile', error);
          this.errorMessage = 'Error al actualizar el perfil';
          this.successMessage = '';
          this.loading = false;
        }
      });
    }
  }

  changePassword(): void {
    this.changePasswordMode = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.passwordForm.reset();
  }

  cancelPasswordChange(): void {
    this.changePasswordMode = false;
  }

  submitPasswordChange(): void {
    if (this.passwordForm.valid) {
      this.loading = true;
      const passwordData = {
        currentPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword
      };
      
      this.apiService.changePassword(passwordData).subscribe({
        next: () => {
          this.successMessage = 'Contraseña actualizada correctamente';
          this.errorMessage = '';
          this.changePasswordMode = false;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error changing password', error);
          this.errorMessage = 'Error al cambiar la contraseña. Verifica tu contraseña actual.';
          this.successMessage = '';
          this.loading = false;
        }
      });
    }
  }
}
