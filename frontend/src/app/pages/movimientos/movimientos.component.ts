import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {
  movimientos: any[] = [];
  categorias: any[] = [];
  movimientoForm: FormGroup;
  error = '';
  success = '';
  cargando = false;
  loading = true;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.movimientoForm = this.fb.group({
      monto: [0, [Validators.required, Validators.min(1)]],
      tipo: ['INGRESO', Validators.required],
      descripcion: ['', Validators.required],
      fecha: [new Date().toISOString().substring(0, 16), Validators.required], // Agregar control de fecha
      categoria: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.cargarMovimientos();
    this.cargarCategorias();
  }

  cargarMovimientos() {
    const token = this.auth.getToken();
    if (token) {
      this.api.getMovimientos(token).subscribe({
        next: (res) => {
          this.movimientos = res;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudieron cargar los movimientos';
          this.loading = false;
        }
      });
    }
  }

  cargarCategorias() {
    const token = this.auth.getToken();
    if (token) {
      this.api.getCategorias(token).subscribe({
        next: (res) => {
          this.categorias = res;
        }
      });
    }
  }

  agregarMovimiento() {
    if (this.movimientoForm.invalid) return;
    const token = this.auth.getToken();
    if (token) {
      this.cargando = true;
      // Convertir la fecha al formato ISO adecuado antes de enviar
      const formValue = { ...this.movimientoForm.value };
      formValue.fecha = new Date(formValue.fecha).toISOString();

      this.api.addMovimiento(formValue, token).subscribe({
        next: (res) => {
          this.success = 'Movimiento agregado';
          this.error = '';
          this.movimientoForm.reset({ 
            monto: 0, 
            tipo: 'INGRESO', 
            descripcion: '', 
            fecha: new Date().toISOString().substring(0, 16), // Resetear fecha
            categoria: null 
          });
          this.cargarMovimientos();
          this.cargando = false;
        },
        error: () => {
          this.error = 'No se pudo agregar el movimiento';
          this.success = '';
          this.cargando = false;
        }
      });
    }
  }
}