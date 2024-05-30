import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import {TestNumericService} from "../../service/test-numeric.service";
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
import {SalesMonthlyResponse} from "../../interfaces/test-left-right.interface";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TestCertificateComponent} from "../test-certificate/test-certificate.component";
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';



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



@Component({
  selector: 'app-test-left-right',
  templateUrl: './test-left-right.component.html',
  styleUrls: ['./test-left-right.component.scss']
})
export class TestLeftRightComponent implements OnInit {

  @ViewChild('monthlySalesGraph') private monthlySalesGraphRef!: ElementRef;
  public monthlySalesGraph!: Chart;

  randomPlaybackSubscription: Subscription | undefined;


  idAudio: number = 1;
  testVariable: any;
  graph : boolean = false;
  counterRight: number = 0;
  counterLeft: number = 0;
  currentPosition: number = 0;
  gifUrl: string = 'assets/images/git-audio.gif';
  isGifPlaying: boolean = false;
  randomIndex : any;
  isButtonsDisabled = false;


  constructor(
    private _test: TestNumericService,
    private _router: Router,
    private dialog: MatDialog,


  ) { }

  ngOnInit(): void {
    // this.playAudioLeft();
    this.playGif();
    this.playRandomAudio();
  }

  updateGraphResult(): void {

    localStorage.setItem('counterRight', this.counterRight.toString());
    localStorage.setItem('counterLeft', this.counterLeft.toString());

  }

  playGif() {
    this.isGifPlaying = true;
    this.isButtonsDisabled = true;

    // Detén el gif después de 5 segundos
    setTimeout(() => {
      this.isGifPlaying = false;
      this.isButtonsDisabled = false;
    }, 5000);
  }



  //grafica
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

  //Botones de pasar audios
  btnRight(){


    if (this.idAudio< 7) {

      if (this.randomIndex === 1){
        this.counterRight+=2;
      }else{
        this.randomIndex = 0
      }

      if (this.testVariable == 2) {
        this.counterRight+=2;
      }else{
        this.counterRight--;

      }
      this.playGif();
      this.playAudioLeft();
      this.idAudio++;
    }else {
      this.graph = true;
      this.initGraph();
      this.updateGraphResult();
    }
  }

  btnLeft(){
    if (this.idAudio< 7){
      if (this.testVariable == 1){
        this.counterLeft +=2;
      }else {
        this.counterLeft --;

      }
      this.playGif();
      this.playAudioRight();
    }else{
      this.graph = true;
      this.initGraph();
      this.updateGraphResult();

    }

  }

  btnNone(){
    this.playGif();
    this.btnRight();
    this.idAudio++;
    this.updateGraphResult();


  }

  //mostrar grafica
  initGraph(){
    const tiempoDeEspera = 2000; // 2000 milisegundos (2 segundos)

    setTimeout(() => {
      this.getMonthlySalesData();

    }, tiempoDeEspera);

  }

  scheduleAppointment(){
    this._router.navigateByUrl('/doctor/1');
    this.closeModal();
  }

  closeModal(){
    this.dialog.closeAll();

  }

  openModalTestCertificate() {
    const nameTest = "de derecha e izquierda";
    this.dialog.open(TestCertificateComponent, {
      data: nameTest,
      width: '700px',
      height: '500px'
    })
  }


  // Función para reproducir de forma aleatoria
  playRandomAudio() {
    // Detén cualquier reproducción aleatoria existente
    if (this.randomPlaybackSubscription) {
      this.randomPlaybackSubscription.unsubscribe();
    }

    // Genera un número aleatorio (0 o 1)
    this.randomIndex = Math.floor(Math.random() * 2);

    // Elige la función de reproducción según el número aleatorio
    const randomFunction = this.randomIndex === 0 ? this.playAudioLeft : this.playAudioRight;



    // Ejecuta la función de reproducción
    randomFunction.call(this);

    // Reproduce nuevamente de forma aleatoria después de un intervalo de tiempo (por ejemplo, 5 segundos)
    this.randomPlaybackSubscription = timer(5000).pipe(take(1)).subscribe(() => {
      // this.playRandomAudio();
    });
  }



  playAudioLeft() {
    this.testVariable = 1;
    const audioContext = new (window.AudioContext)();

    this._test.getAudioRight(this.idAudio).subscribe((data: any) => {
      audioContext.decodeAudioData(data, (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;

        const panNode = audioContext.createStereoPanner();
        panNode.pan.value = -1;  // Para reproducir solo en el canal izquierdo
        panNode.connect(audioContext.destination);
        source.connect(panNode);
        source.start();
      });
    });

  }
  playAudioRight() {
    this.testVariable = 2;
    const audioContext = new (window.AudioContext)();

    this._test.getAudioRight(this.idAudio).subscribe((data: any) => {
      audioContext.decodeAudioData(data, (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;

        const panNode = audioContext.createStereoPanner();
        panNode.pan.value = 1;  // Para reproducir solo en el canal izquierdo
        panNode.connect(audioContext.destination);
        source.connect(panNode);
        source.start();
      });
    });

  }

}
