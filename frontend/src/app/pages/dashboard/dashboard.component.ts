import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { format, subDays, subMonths, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-dashboard',
  standalone: true,  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  balance: any = null;
  loading = true;
  error = '';
  movimientos: any[] = [];
  categorias: any[] = [];
  usuario: any = null;
  
  // Filtros de fechas
  fechaInicio: string = format(subMonths(new Date(), 1), 'yyyy-MM-dd');
  fechaFin: string = format(new Date(), 'yyyy-MM-dd');
    // Gráficos
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15
        }
      },
      tooltip: {
        enabled: true
      }
    }
  };
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };
  
  public pieChartType: ChartType = 'pie';
  
  // Gráfico de línea para tendencias temporales
  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [],
        label: 'Ingresos',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        fill: true,
      },
      {
        data: [],
        label: 'Gastos',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        fill: true,
      }
    ],
    labels: []
  };
    public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 3
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 5
        }
      },
      x: {
        ticks: {
          maxTicksLimit: 6,
          maxRotation: 0
        }
      }
    },
    plugins: {
      legend: { 
        display: true,
        position: 'top',
        labels: {
          boxWidth: 12,
          usePointStyle: true
        }
      }
    }
  };
  
  public lineChartType: ChartType = 'line';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }
  
  cargarDatos() {
    this.loading = true;
    const token = this.auth.getToken();
    
    if (token) {
      // Obtener categorías para los gráficos
      this.api.getCategorias(token).subscribe({
        next: (cats) => {
          this.categorias = cats;
          
          // Obtener movimientos con filtro de fechas
          this.api.getMovimientosPorFecha(token, this.fechaInicio, this.fechaFin).subscribe({
            next: (movs: any[]) => {
              this.movimientos = movs;
              if (!this.movimientos || this.movimientos.length === 0) {
                this.error = 'No hay movimientos en el período seleccionado';
                this.loading = false;
              } else {
                // Si hay movimientos, obtener el balance/resumen
                this.api.getBalance(token).subscribe({
                  next: (res) => {
                    this.balance = res;
                    this.loading = false;
                    this.generarGraficoPorCategoria();
                    this.generarGraficoTendencias();
                  },
                  error: () => {
                    this.error = 'No se pudo cargar el balance';
                    this.loading = false;
                  }
                });
              }
            },
            error: () => {
              this.error = 'No se pudo cargar la información de movimientos';
              this.loading = false;
            }
          });
        },
        error: () => {
          this.error = 'No se pudo cargar la información de categorías';
          this.loading = false;
        }
      });
    }
  }
  
  // Método para filtrar datos por fecha
  aplicarFiltroFechas() {
    this.cargarDatos();
  }
  
  // Método auxiliar para buscar nombres de categorías
  getNombreCategoria(categoriaId: number): string {
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  }
  
  // Generar gráfico de distribución por categorías
  generarGraficoPorCategoria() {
    const categoriaMap = new Map();
    
    // Agrupar gastos por categoría
    this.movimientos.forEach(mov => {
      if (mov.tipo === 'GASTO') {
        const nombreCategoria = this.categorias.find(cat => cat.id === mov.categoriaId)?.nombre || 'Sin categoría';
        
        if (categoriaMap.has(nombreCategoria)) {
          categoriaMap.set(nombreCategoria, categoriaMap.get(nombreCategoria) + mov.monto);
        } else {
          categoriaMap.set(nombreCategoria, mov.monto);
        }
      }
    });
    
    // Preparar datos para el gráfico
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColors: string[] = [];
    
    // Colores predefinidos para el gráfico
    const colors = [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(199, 199, 199, 0.7)'
    ];
    
    let colorIndex = 0;
    categoriaMap.forEach((valor, categoria) => {
      labels.push(categoria);
      data.push(valor);
      backgroundColors.push(colors[colorIndex % colors.length]);
      colorIndex++;
    });
    
    // Actualizar datos del gráfico
    this.pieChartData = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors
      }]
    };
  }
  
  // Generar gráfico de tendencias temporales
  generarGraficoTendencias() {
    // Agrupar movimientos por fecha
    const fechasMap = new Map();
    const ingresosMap = new Map();
    const gastosMap = new Map();
    
    // Obtener todas las fechas únicas
    const fechasUnicas = [...new Set(this.movimientos.map(mov => 
      format(parseISO(mov.fecha), 'yyyy-MM-dd')
    ))].sort();
    
    // Inicializar todas las fechas con valor cero
    fechasUnicas.forEach(fecha => {
      ingresosMap.set(fecha, 0);
      gastosMap.set(fecha, 0);
    });
    
    // Sumar montos por fecha y tipo
    this.movimientos.forEach(mov => {
      const fecha = format(parseISO(mov.fecha), 'yyyy-MM-dd');
      
      if (mov.tipo === 'INGRESO') {
        ingresosMap.set(fecha, (ingresosMap.get(fecha) || 0) + mov.monto);
      } else {
        gastosMap.set(fecha, (gastosMap.get(fecha) || 0) + mov.monto);
      }
    });
    
    // Convertir las fechas a formato más amigable para mostrar
    const labelsFormateados = fechasUnicas.map(fecha => 
      format(parseISO(fecha), 'd MMM', { locale: es })
    );
    
    // Preparar datos para el gráfico
    const datosIngresos = fechasUnicas.map(fecha => ingresosMap.get(fecha));
    const datosGastos = fechasUnicas.map(fecha => gastosMap.get(fecha));
    
    // Actualizar datos del gráfico
    this.lineChartData = {
      datasets: [
        {
          data: datosIngresos,
          label: 'Ingresos',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: '#fff',
          fill: true,
        },
        {
          data: datosGastos,
          label: 'Gastos',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: '#fff',
          fill: true,
        }
      ],
      labels: labelsFormateados
    };
  }
}