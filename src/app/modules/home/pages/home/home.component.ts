import {Component, OnInit} from '@angular/core';
import SwiperCore, {A11y, Navigation, Pagination, Scrollbar, SwiperOptions} from "swiper";
import {Doctor} from "../../../auth/interface/home.interface";
import {Router} from "@angular/router";

import {MatDialog} from "@angular/material/dialog";
import {TestNumericComponent} from "../../../test/pages/test-numeric/test-numeric.component";
import {TestLeftRightComponent} from "../../../test/pages/test-left-right/test-left-right.component";
import {HomeService} from "../../service/home.service";


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  config: SwiperOptions = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 32,
    navigation: true,  // Habilita la navegación
    pagination: {clickable: true},
    scrollbar: {draggable: true},
  };

  slides = [
    {
      image: 'assets/images/idea2.png',
    },
    {
      image: 'assets/images/idea.png',
    },
    {
      image: 'assets/images/auth/login1.png',
    },
  ];

  doctors: Doctor[] = [
    {
      id: 1,
      name: 'Mario Alejandro',
      lastname: 'Contreras Gutierrez',
      specialty: 'Terapeuta complementario, Médico general',
      img: 'assets/images/doc1.png',
      openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
      address: '',
      experience: [
        {

          experienceName: 'Acupuntura'
        },
        {
          experienceName: 'Terapia Neuronal'
        }
      ]
    },
    {
      id: 2,
      name: 'Sandrith Tatiana',
      lastname: 'Guerrero Rincon',
      specialty: 'Otorrinolaringologo',
      img: 'assets/images/doc2.png',
      openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
      address: '',
      experience: [
        {
          experienceName: 'Acupuntura'
        },
        {
          experienceName: 'Terapia Neuronal'
        }
      ]
    },
    {
      id: 3,
      name: 'Edgardo Enrique',
      lastname: 'Paba Gonzalez',
      specialty: 'Médico general',
      img: 'assets/images/doc3.png',
      address: '',
      openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
      experience: [
        {

          experienceName: 'Acupuntura'
        },
        {
          experienceName: 'Terapia Neuronal'
        }
      ]
    },
    {
      id: 4,
      name: 'Mildreth Amanda',
      lastname: 'Carrascal Torrado',
      specialty: 'Médico general',
      img: 'assets/images/doc4.png',
      address: '',
      openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
      experience: [
        {

          experienceName: 'Acupuntura'
        },
        {
          experienceName: 'Terapia Neuronal'
        }
      ]
    },
    {
      id: 5,
      name: 'Juan Carlos',
      lastname: 'Jimenez Illera',
      specialty: 'Médico general',
      img: 'assets/images/doc5.png',
      address: '',
      openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
      experience: [
        {

          experienceName: 'Acupuntura'
        },
        {
          experienceName: 'Terapia Neuronal'
        }
      ]
    },
  ]


  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _home: HomeService,
  ) {
  }

  ngOnInit(): void {
    this.testStart();

  }

  openModalTestNumeric() {
    this._dialog.open(TestNumericComponent, {
      width: '500px',
      height: '600px'
    })
  }

  openModalTestLeftRight() {
    this._dialog.open(TestLeftRightComponent, {
      width: '500px',
      height: '300px'
    })
  }

  OnDoctor() {
    this._router.navigateByUrl('/doctor');
  }

  testStart() {
    this._home.startTest().subscribe({
      next: (data) => {
        console.log(data)
        this.siu();
      }
    })
  }

  inputNumbers : boolean = true
  siu(){
    this._home.submitResults(this.inputNumbers).subscribe({
      next: (data) => {
        this._home.getAudio().subscribe((audioBlob: Blob) => {
          // Crea una URL de objeto para el blob
          const audioUrl = URL.createObjectURL(audioBlob);

          // Crea un elemento de audio y establece la URL del objeto como su fuente
          const audio = new Audio(audioUrl);

          // Reproduce el audio
          audio.play();
        });
      }
    })
  }

  playAudio(): void {
    this._home.getAudio().subscribe((audioBlob: Blob) => {
      // Crea una URL de objeto para el blob
      const audioUrl = URL.createObjectURL(audioBlob);

      // Crea un elemento de audio y establece la URL del objeto como su fuente
      const audio = new Audio(audioUrl);

      // Reproduce el audio
      audio.play();
    });
  }


}
