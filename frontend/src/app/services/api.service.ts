import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importar AuthService

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {} // Inyectar AuthService

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }
  getMovimientos(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movimientos`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
  
  getMovimientosPorFecha(token: string, fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movimientos`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      params: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      }
    });
  }

  addMovimiento(movimiento: any, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/movimientos`, movimiento, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  getCategorias(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categorias`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  addCategoria(categoria: any, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/categorias`, categoria, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  getBalance(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/reportes/balance`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  getUserProfile(): Observable<any> {
    const token = this.authService.getToken(); // Usar AuthService para obtener el token
    return this.http.get(`${this.baseUrl}/users/profile`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  updateUserProfile(profileData: any): Observable<any> {
    const token = this.authService.getToken(); // Usar AuthService para obtener el token
    return this.http.put(`${this.baseUrl}/users/profile`, profileData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  changePassword(passwordData: any): Observable<any> {
    const token = this.authService.getToken(); // Usar AuthService para obtener el token
    return this.http.post(`${this.baseUrl}/users/change-password`, passwordData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}