import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, NgForOf, NgIf],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
  nueva = { nombre: '', descripcion: '' };
  error = '';
  success = '';
  loading = true;

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    const token = this.auth.getToken();
    if (token) {
      this.api.getCategorias(token).subscribe({
        next: (res) => {
          this.categorias = res;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudieron cargar las categorías';
          this.loading = false;
        }
      });
    }
  }

  agregarCategoria() {
    const token = this.auth.getToken();
    if (token) {
      this.api.addCategoria(this.nueva, token).subscribe({
        next: (res) => {
          this.success = 'Categoría agregada';
          this.error = '';
          this.nueva = { nombre: '', descripcion: '' };
          this.cargarCategorias();
        },
        error: () => {
          this.error = 'No se pudo agregar la categoría';
          this.success = '';
        }
      });
    }
  }
}