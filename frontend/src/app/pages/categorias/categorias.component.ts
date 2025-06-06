import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Importar NgForm
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, NgForOf, NgIf],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit, OnDestroy {
  @ViewChild('categoriaForm') categoriaForm!: NgForm; // Añadir ViewChild para el formulario

  categorias: Categoria[] = [];
  // Usar un solo objeto para el formulario
  categoriaEnFormulario: Partial<Categoria> = { nombre: '', descripcion: '' };
  
  // Reemplazar error y success por successMessage y errorMessage
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private successTimeout: any;
  private errorTimeout: any;

  loading = true;
  modoEdicion = false;
  idCategoriaEditada: number | null | undefined = null; // Para mantener el ID durante la edición

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  ngOnDestroy() {
    clearTimeout(this.successTimeout);
    clearTimeout(this.errorTimeout);
  }

  private showSuccessMessage(message: string, duration: number = 3000) {
    this.clearMessages(); // Limpia cualquier mensaje anterior
    this.successMessage = message;
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
    this.successTimeout = setTimeout(() => {
      this.successMessage = null;
    }, duration);
  }

  private showErrorMessage(message: string, duration: number = 5000) {
    this.clearMessages(); // Limpia cualquier mensaje anterior, incluyendo éxito
    this.errorMessage = message;
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
    this.errorTimeout = setTimeout(() => {
      this.errorMessage = null;
    }, duration);
  }

  private clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
  }

  cargarCategorias() {
    this.loading = true;
    this.api.getCategorias().subscribe({
      next: (res) => {
        this.categorias = res;
        this.loading = false;
      },
      error: (err) => {
        // Usar showErrorMessage
        this.showErrorMessage('No se pudieron cargar las categorías. ' + (err.error?.message || err.message));
        this.loading = false;
      }
    });
  }

  prepararFormularioParaAgregar() {
    this.modoEdicion = false;
    this.categoriaEnFormulario = { nombre: '', descripcion: '' }; // Resetear el objeto del modelo
    this.idCategoriaEditada = null;
    // this.clearMessages(); // Eliminar esta línea

    // Resetear el estado del formulario (pristine, untouched) con los nuevos valores
    if (this.categoriaForm) {
      this.categoriaForm.resetForm(this.categoriaEnFormulario);
    }
  }

  agregarCategoria() {
    if (!this.categoriaEnFormulario.nombre) {
      this.showErrorMessage('El nombre de la categoría es obligatorio.');
      return;
    }
    this.api.addCategoria(this.categoriaEnFormulario as Categoria).subscribe({
      next: (res) => {
        this.showSuccessMessage('Categoría agregada exitosamente.');
        this.cargarCategorias(); // Cargar categorías
        this.prepararFormularioParaAgregar(); // Luego, preparar formulario para nueva entrada
      },
      error: (err) => {
        this.showErrorMessage('No se pudo agregar la categoría. ' + (err.error?.message || err.message));
      }
    });
  }

  iniciarEdicion(categoria: Categoria) {
    this.modoEdicion = true;
    // Clonar para evitar modificar el original directamente en la lista
    this.categoriaEnFormulario = { ...categoria }; 
    this.idCategoriaEditada = categoria.id;
    this.clearMessages(); // Limpiar mensajes
  }

  guardarEdicionCategoria() {
    if (!this.idCategoriaEditada) {
      this.showErrorMessage('ID de categoría inválido para la edición.');
      return;
    }
    if (!this.categoriaEnFormulario.nombre) {
      this.showErrorMessage('El nombre de la categoría es obligatorio.');
      return;
    }

    this.api.updateCategoria(this.idCategoriaEditada, this.categoriaEnFormulario).subscribe({
      next: (res) => {
        this.showSuccessMessage('Categoría actualizada exitosamente.');
        this.cargarCategorias(); // Cargar categorías
        this.prepararFormularioParaAgregar(); // Luego, preparar formulario para nueva entrada
      },
      error: (err) => {
        this.showErrorMessage('No se pudo actualizar la categoría. ' + (err.error?.message || err.message));
      }
    });
  }

  cancelarEdicion() {
    this.prepararFormularioParaAgregar(); // Restablece el formulario al modo de agregar
  }

  eliminarCategoria(id: number | undefined) {
    if (id === undefined) {
        this.showErrorMessage('ID de categoría inválido.');
        return;
    }
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.api.deleteCategoria(id).subscribe({
        next: () => {
          this.showSuccessMessage('Categoría eliminada exitosamente.');
          this.cargarCategorias(); 
          // Si la categoría eliminada era la que se estaba editando, resetear formulario
          if (this.modoEdicion && this.idCategoriaEditada === id) {
            this.prepararFormularioParaAgregar();
          }
        },
        error: (err) => {
          this.showErrorMessage('No se pudo eliminar la categoría. ' + (err.error?.message || err.message));
        }
      });
    }
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.modoEdicion) {
      this.guardarEdicionCategoria();
    } else {
      this.agregarCategoria();
    }
  }
}