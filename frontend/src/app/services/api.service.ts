import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Categoria } from '../models/categoria.model'; // Importar la interfaz Categoria

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }
  getMovimientos(tokenAntiguo?: string): Observable<any> { // tokenAntiguo es opcional y no se usará
    const token = this.authService.getToken();
    return this.http.get(`${this.baseUrl}/movimientos`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
  
  getMovimientosPorFecha(fechaInicio: string, fechaFin: string, tokenAntiguo?: string): Observable<any> { // tokenAntiguo es opcional y no se usará
    const token = this.authService.getToken();
    return this.http.get(`${this.baseUrl}/movimientos`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      params: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      }
    });
  }

  addMovimiento(movimiento: any, tokenAntiguo?: string): Observable<any> { // tokenAntiguo es opcional y no se usará
    const token = this.authService.getToken();
    return this.http.post(`${this.baseUrl}/movimientos`, movimiento, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  getCategorias(tokenAntiguo?: string): Observable<Categoria[]> { // tokenAntiguo es opcional y no se usará, tipar el retorno con Categoria[]
    const token = this.authService.getToken();
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`, { // Tipar la respuesta del GET
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  addCategoria(categoria: Omit<Categoria, 'id'>, tokenAntiguo?: string): Observable<Categoria> { // tokenAntiguo es opcional y no se usará, tipar el parámetro y el retorno
    const token = this.authService.getToken();
    return this.http.post<Categoria>(`${this.baseUrl}/categorias`, categoria, { // Tipar la respuesta del POST
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  updateCategoria(id: number, categoriaData: Partial<Categoria>): Observable<Categoria> {
    const token = this.authService.getToken();
    return this.http.put<Categoria>(`${this.baseUrl}/categorias/${id}`, categoriaData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  deleteCategoria(id: number): Observable<void> { // Retorna void o un objeto de respuesta si la API lo envía
    const token = this.authService.getToken();
    return this.http.delete<void>(`${this.baseUrl}/categorias/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  getBalance(tokenAntiguo?: string): Observable<any> { // tokenAntiguo es opcional y no se usará
    const token = this.authService.getToken();
    // Este método se mantiene por si se necesita un balance general sin filtro de fecha en algún otro lugar.
    // O puede ser deprecado/eliminado si getBalanceConFiltro cubre todos los casos de uso.
    return this.http.get(`${this.baseUrl}/reportes/balance`, { // Asumiendo que este endpoint ahora podría tomar fechas o no.
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  getBalanceConFiltro(fechaInicio: string, fechaFin: string, tokenAntiguo?: string): Observable<any> {
    const token = this.authService.getToken();
    return this.http.get(`${this.baseUrl}/reportes/balance`, { // Llama al mismo endpoint, pero con parámetros de fecha
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      params: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      }
    });
  }

  getUserProfile(): Observable<any> {
    const token = this.authService.getToken();
    return this.http.get(`${this.baseUrl}/users/profile`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  updateUserProfile(profileData: any): Observable<any> {
    const token = this.authService.getToken();
    return this.http.put(`${this.baseUrl}/users/profile`, profileData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  changePassword(passwordData: any): Observable<any> {
    const token = this.authService.getToken();
    return this.http.post(`${this.baseUrl}/users/change-password`, passwordData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}