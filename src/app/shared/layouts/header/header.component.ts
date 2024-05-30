import { Component, HostListener, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ReminderComponent} from "../../../modules/reminder/pages/reminder/reminder.component";
import {Router} from "@angular/router";
import {AppointmentComponent} from "../../../modules/appointment/pages/appointment/appointment.component";
import {AboutUsComponent} from "../about-us/about-us.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  constructor(
    private route: Router,
    private _dialog: MatDialog,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {


  }

  onSelectChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'medicamentos') {
      this.openModalReminder();
    }
    if (selectedValue === 'inicio') {
      this.route.navigateByUrl('/home')
    }
    if (selectedValue === 'citas') {
      this.openModalAppointment();
    }

  }

  openModalReminder(){
    this._dialog.open(ReminderComponent, {
      width: '500px',
      height: '600px'
    })
  }

  openModalAppointment(){
    this._dialog.open(AppointmentComponent, {
      width: '500px',
      height: '600px'
    })
  }

  openModalAboutUS(){
    this._dialog.open(AboutUsComponent, {
      width: '800px',
      height: '600px'
    })
  }

  OnProfile(){
    this._router.navigateByUrl('/profile');
  }


}
