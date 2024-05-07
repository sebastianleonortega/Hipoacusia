import {Component, OnInit} from '@angular/core';
import {Doctor} from "../../../auth/interface/home.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../core/services/alert.service";
import {DoctorService} from "../service/doctor.service";
import {LocalTime} from 'js-joda';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from "../../../../core/services/storage.service";
import {LoadingService} from "../../../../core/services/loading.service";


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  public scheduleAppointment: FormGroup = new FormGroup({});

  openingHours: string = '8:00 - 12:00 & 2:00 - 6:00 de lunes a viernes';
  dateNow: Date = new Date();


  userData: any;
  doctorId: any;

  doctor: Doctor = {
    administrator: false,
    doctor_address: "",
    doctor_email: "",
    doctor_image: "",
    doctor_last_name: "",
    doctor_name: "",
    doctor_phone: "",
    profile_image: "",
    user_id: "",
    user_name: "",
    doctor_description: "",
  };


  appointmentTime = [
    {value: '08:00', label: '08:00-08:30'},
    {value: '08:30', label: '08:30-09:00'},
    {value: '09:00', label: '09:00-09:30'},
    {value: '09:30', label: '09:30-10:00'},
    {value: '10:00', label: '10:00-10:30'},
    {value: '10:30', label: '10:30-11:00'},
    {value: '11:00', label: '11:00-11:30'},
    {value: '11:30', label: '11:30-12:00'},
    {value: '14:00', label: '14:00-14:30'},
    {value: '14:30', label: '14:30-15:00'},
    {value: '15:00', label: '15:00-15:30'},
    {value: '15:30', label: '15:30-16:00'}
  ];

  speciality: any[] = [
    {value: '1', label: 'Otorrinonaringonohpta'}, //mientras se pone en el back, abajo donde se trae el doctor esta lo otro
    {value: '1', label: 'Medicina general🤷‍♂️'},
  ];


  constructor(
    private _doctor: DoctorService,
    private _alert: AlertService,
    private route: ActivatedRoute,
    private _storage: StorageService,
    private _loader: LoadingService
  ) {
    this.userData = this._storage.getItem<any>('user_data');
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.initScheduleAppointment();
    this.getDoctorById();
  }

  getDoctorById() {
    this.route.paramMap.subscribe(params => {
      this.doctorId = params.get('id');
    });
    this._doctor.getDoctorById(this.doctorId).subscribe({
      next: (data) => {
        this.doctor = data;
        // this.speciality = data.speciality;   <- falta en el back, para listar las especialidades del doctor
        console.log(this.doctor)
      }
    })
  }

  initScheduleAppointment(): void {
    this.scheduleAppointment = new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      specialty: new FormControl(null, [Validators.required]),
    });

  }

  sendScheduleAppointment() {
    if (this.scheduleAppointment.valid) {

      const selectedTime: string = this.scheduleAppointment.get('time')?.value;

      // Asegúrate de que la cadena de tiempo tenga dos dígitos para las horas y minutos
      const [hours, minutes] = selectedTime.split(':');
      const formattedTime: string = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

      const localTime: LocalTime = LocalTime.parse(formattedTime);

      const data: any = {
        date: this.scheduleAppointment.get('date')?.value,
        specialty: this.scheduleAppointment.get('specialty')?.value,
        address: this.doctor.doctor_address,
        user: this.userData.user_id,
        doctor: this.doctor.user_id,
        time: localTime,
      };

      console.log(data)


      this._doctor.createAppointment(data).subscribe({
        error: () => {
          this._alert.warning("Ya existe una cita registrada en esta fecha y hora");
        }, next: (error) => {
          window.scrollTo(0, 0);
          this.scheduleAppointment.reset();
          this._alert.success("Cita registrada");
        }
      });
    }

  }

  asd(): void {
    this._loader.show();
    console.log('asd');
    setTimeout(() => {
      this._loader.hide();
    }, 3000)
  }

}
