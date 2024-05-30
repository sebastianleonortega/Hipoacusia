import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip
} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import {SalesMonthlyResponse, UserResponseData} from "../../../test/interfaces/test-left-right.interface";
import {TestNumericService} from "../../../test/service/test-numeric.service";
import {AppService} from "../../../../app.service";


Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  ChartDataLabels
);

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-graph-user',
  templateUrl: './graph-user.component.html',
  styleUrls: ['./graph-user.component.scss']
})


export class GraphUserComponent implements OnInit {

  @ViewChild('monthlySalesGraph') private monthlySalesGraphRef!: ElementRef;
  public monthlySalesGraph!: Chart;


  @ViewChild('monthlySalesGraph1') private monthlySalesGraphRef1!: ElementRef;
  public monthlySalesGraph1!: Chart;


  counterRight!: number ;
  counterLeft!: number ;


  resultGraph !: number ;

  constructor(private _appService: AppService) {
    this._appService.getGraphResult.subscribe((graphResultValue) => {
    })
  }

  ngOnInit(): void {
    this.initGraph();
    this.initGraph1();

    const graphResultFromLocalStorage = localStorage.getItem('graphResult');
    const graphResultFromLocalStorageRight = localStorage.getItem('counterRight');
    const graphResultFromLocalStorageLeft = localStorage.getItem('counterLeft');

    if (graphResultFromLocalStorage !== null) {
      this.resultGraph = +graphResultFromLocalStorage;
    }

    if (graphResultFromLocalStorageRight !== null) {
      this.counterRight = +graphResultFromLocalStorageRight;
    }

    if (graphResultFromLocalStorageLeft !== null) {
      this.counterLeft = +graphResultFromLocalStorageLeft;
    }
  }


  //grafic
  getMonthlySalesData() {
    const data: SalesMonthlyResponse = [
      {
        ear: 'Derecho',
        total_sales: this.counterRight
      },
      {
        ear: 'Izquierdo',
        total_sales: this.counterLeft
      }
    ];

    const maxSales = 12; // Definir un valor máximo para el eje y (meses)

    const monthlySalesLabels: string[] = ['Oído Derecho', 'Oído Izquierdo'];
    const monthlySalesData: number[][] = data.map(sale => [sale.total_sales, 0]);

    this.createMonthlySalesGraph(monthlySalesLabels, monthlySalesData, maxSales);
  }

  createMonthlySalesGraph(monthlySalesLabels: string[], monthlySalesData: number[][], maxSales: number) {
    this.monthlySalesGraph = new Chart(this.monthlySalesGraphRef.nativeElement, {
      type: 'bar', // Cambiamos el tipo de gráfico a barra
      data: {
        labels: monthlySalesLabels,
        datasets: [
          {
            label: 'Respuestas correctas Derecha',
            data: monthlySalesData.map(d => d[0]),
            backgroundColor: monthlySalesData.map(d => {
              if (d[0] <= 4) {
                return 'rgba(255, 0, 0, 0.7)'; // Rojo
              } else if (d[0] >= 5 && d[0] <= 7) {
                return 'rgba(0, 0, 255, 0.7)'; // Azul
              } else {
                return 'rgba(0, 255, 0, 0.7)'; // Verde
              }
            }),
            borderColor: monthlySalesData.map(d => {
              if (d[0] <= 4) {
                return 'rgba(255, 0, 0, 1)';
              } else if (d[0] >= 5 && d[0] <= 7) {
                return 'rgba(0, 0, 255, 1)';
              } else {
                return 'rgba(0, 255, 0, 1)';
              }
            }),
            borderWidth: 1,
            barPercentage: 5, // Ajusta el ancho de la barra
            categoryPercentage: 0.1 // Ajusta el espacio entre las barras
          },
          {
            label: 'Respuestas correctas Izquierda',
            data: monthlySalesData.map(d => d[1]),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            position: 'left',
            min: 1,
            max: maxSales
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              align: 'center' // Centra las etiquetas
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Oculta la leyenda
          },
          datalabels: {
            display: false
          }
        }
      },
    });
  }

  initGraph() {
    const tiempoDeEspera = 2000; // 2000 milisegundos (2 segundos)

    setTimeout(() => {
      this.getMonthlySalesData();
    }, tiempoDeEspera);
  }


  getMonthlySalesData1() {
    const data: UserResponseData = {
      name: 'Juan Sebastian',
      total_sales: this.resultGraph


    };

    const monthlySalesLabels: string[] = [data.name];
    const monthlySalesData: number[] = [data.total_sales];

    this.createMonthlySalesGraph1(monthlySalesLabels, monthlySalesData);
  }

  createMonthlySalesGraph1(monthlySalesLabels: string[], monthlySalesData: number[]) {
    this.monthlySalesGraph1 = new Chart(this.monthlySalesGraphRef1.nativeElement, {
      type: 'bar',
      data: {
        labels: monthlySalesLabels,
        datasets: [
          {
            label: 'Respuestas correctas',
            data: monthlySalesData,
            backgroundColor: monthlySalesData.map(d => {
              if (d <= 3) {
                return 'rgba(255, 0, 0, 0.7)'; // Rojo
              } else if (d === 4 || d === 5) {
                return 'rgba(0, 0, 255, 0.7)'; // Azul
              } else {
                return 'rgba(0, 255, 0, 0.7)'; // Verde
              }
            }),
            borderColor: monthlySalesData.map(d => {
              if (d <= 3) {
                return 'rgba(255, 0, 0, 1)';
              } else if (d === 4 || d === 5) {
                return 'rgba(0, 0, 255, 1)';
              } else {
                return 'rgba(0, 255, 0, 1)';
              }
            }),
            borderWidth: 1,
            barPercentage: 0.5,
            categoryPercentage: 0.8
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            position: 'left',
            min: 1,
            max: 6
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              align: 'center'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            display: false
          }
        }
      },
    });
  }

  initGraph1() {
    const tiempoDeEspera = 2000; // 2000 milisegundos (2 segundos)

    setTimeout(() => {
      this.getMonthlySalesData1();
    }, tiempoDeEspera);
  }

}
