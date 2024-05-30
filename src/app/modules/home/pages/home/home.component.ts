import {Component, HostListener, OnInit} from '@angular/core';
import SwiperCore, {A11y, Navigation, Pagination, Scrollbar, SwiperOptions} from "swiper";
import {Doctor} from "../../../auth/interface/home.interface";
import {Router} from "@angular/router";

import {MatDialog} from "@angular/material/dialog";
import {TestLeftRightComponent} from "../../../test/pages/test-left-right/test-left-right.component";
import {HomeService} from "../../service/home.service";
import {TestNumericNewComponent} from "../../../test/pages/test-numeric-new/test-numeric-new.component";
import {ViewportScroller} from "@angular/common";


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
      text: 'Agenda tu cita de manera fácil y rápida. Con nuestra plataforma, puedes seleccionar el día y la hora ' +
        'que mejor te convenga, sin necesidad de largas esperas. Encuentra a tu especialista de confianza y programa' +
        ' una consulta en solo unos pocos clics. Además, recibirás confirmaciones y recordatorios automáticos para' +
        ' que no olvides tu cita.'
    },
    {
      image: 'assets/images/idea.png',
      text: 'Agrega recordatorios de medicamentos para llevar un control preciso de tu tratamiento. Nuestra aplicación' +
        ' te permite configurar alertas personalizadas para cada uno de tus medicamentos, asegurando que nunca te' +
        ' saltes una dosis. Mantén un registro detallado de tu medicación y recibe notificaciones a tiempo, todo ' +
        'en un solo lugar'
    },
    // {
    //   image: 'assets/images/auth/login1.png',
    //   text: 'aaaaaaaa'
    // },
    {
      image: 'assets/images/carrucel/carrucel.png',
      text: 'Consulta todas tus citas en un solo lugar. Con nuestro sistema, puedes acceder a tu historial' +
        ' de citas pasadas y futuras, gestionar tus reservas y hacer cambios cuando sea necesario. Mantén tu agenda' +
        ' organizada y asegúrate de estar siempre al día con tus compromisos médicos.'
    },
  ];

  doctors: any[] = [
    // {
    //   id: 1,
    //   name: 'Mario Alejandro',
    //   lastname: 'Contreras Gutierrez',
    //   specialty: 'Terapeuta complementario, Médico general',
    //   img: 'assets/images/doc1.png',
    //   openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
    //   address: '',
    //   experience: [
    //     {
    //
    //       experienceName: 'Acupuntura'
    //     },
    //     {
    //       experienceName: 'Terapia Neuronal'
    //     }
    //   ]
    // },
    // {
    //   id: 2,
    //   name: 'Sandrith Tatiana',
    //   lastname: 'Guerrero Rincon',
    //   specialty: 'Otorrinolaringologo',
    //   img: 'assets/images/doc2.png',
    //   openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
    //   address: '',
    //   experience: [
    //     {
    //       experienceName: 'Acupuntura'
    //     },
    //     {
    //       experienceName: 'Terapia Neuronal'
    //     }
    //   ]
    // },
    // {
    //   id: 3,
    //   name: 'Edgardo Enrique',
    //   lastname: 'Paba Gonzalez',
    //   specialty: 'Otorrinolaringologo',
    //   img: 'assets/images/doc3.png',
    //   address: '',
    //   openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
    //   experience: [
    //     {
    //
    //       experienceName: 'Acupuntura'
    //     },
    //     {
    //       experienceName: 'Terapia Neuronal'
    //     }
    //   ]
    // },
    // {
    //   id: 4,
    //   name: 'Mildreth Amanda',
    //   lastname: 'Carrascal Torrado',
    //   specialty: 'Fonoaudiologo',
    //   img: 'assets/images/doc4.png',
    //   address: '',
    //   openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
    //   experience: [
    //     {
    //
    //       experienceName: 'Acupuntura'
    //     },
    //     {
    //       experienceName: 'Terapia Neuronal'
    //     }
    //   ]
    // },
    // {
    //   id: 5,
    //   name: 'Juan Carlos',
    //   lastname: 'Jimenez Illera',
    //   specialty: 'Fonoaudiologo',
    //   img: 'assets/images/doc5.png',
    //   address: '',
    //   openingHours: '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes',
    //   experience: [
    //     {
    //
    //       experienceName: 'Acupuntura'
    //     },
    //     {
    //       experienceName: 'Terapia Neuronal'
    //     }
    //   ]
    // },
  ]

  showScrollButton = false;


  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _home: HomeService,
    private viewportScroller: ViewportScroller
  ) {
  }

  ngOnInit(): void {
    this.getAllDoctor();
  }

  scroll() {
    window.scrollTo(0, 0);
  }

  getAllDoctor() {
    this._home.getAllDoctor().subscribe({
      next: (data) => {
        this.doctors = data;
      }
    })
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Verifica si el usuario ha scrollado lo suficiente para mostrar u ocultar el botón
    this.showScrollButton = window.scrollY > 100;
  }

  openModalTestNumeric() {
    this._dialog.open(TestNumericNewComponent, {
      width: '500px',
      height: '600px'
    })
  }

  openModalTestLeftRight() {
    this._dialog.open(TestLeftRightComponent, {
      width: '500px',
      height: '600px'
    })
  }

  OnDoctor() {
    this._router.navigateByUrl('/doctor');
  }


}
