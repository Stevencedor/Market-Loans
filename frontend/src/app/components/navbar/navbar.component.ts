import { NgModel } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MovimientosComponent } from '../../pages/movimientos/movimientos.component';
import { CategoriasComponent } from '../../pages/categorias/categorias.component';  
import { Component, inject, OnInit, HostListener, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);
  renderer = inject(Renderer2);
  menuOpen = false;
  scrolled = false;
  ngOnInit(): void {
    // Cerrar el menú al cambiar de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenu();
    });
    
    // Comprobar si la página ya está desplazada al cargar
    this.checkScroll();
  }

  @HostListener('window:scroll')
  checkScroll() {
    this.scrolled = window.scrollY > 30;
  }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    // Añadir clase active al botón hamburguesa cuando está abierto
    const navbarToggle = document.querySelector('.navbar-toggle');
    if (navbarToggle) {
      if (this.menuOpen) {
        this.renderer.addClass(navbarToggle, 'active');
      } else {
        this.renderer.removeClass(navbarToggle, 'active');
      }
    }
    
    // Evitar scroll cuando el menú está abierto en móvil
    if (this.menuOpen) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }
  closeMenu(): void {
    this.menuOpen = false;
    const navbarToggle = document.querySelector('.navbar-toggle');
    if (navbarToggle) {
      this.renderer.removeClass(navbarToggle, 'active');
    }
    this.renderer.removeClass(document.body, 'no-scroll');
  }
  
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}