import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../../../core/services/alert.service";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentService} from "../../service/appointment.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  citas: any;
  noDate: boolean = false;
  id_person: any = 'd0e188e9-d262-4bd9-86d1-b878ad6c6afb'

  constructor(
    private _alert: AlertService,
    public dialog: MatDialog,
    private _appoint: AppointmentService,
  ) {
  }

  ngOnInit(): void {
    this.getAppointmentById();
  }

  getAppointmentById() {
    this._appoint.getAppointmentById(this.id_person).subscribe({
      next: (data) => {
        this.citas = data;

      }
    })

  }

  close(): void {
    this.dialog.closeAll();
  }

  deleteAppointment(id: string) {
    this._appoint.deleteAppointment(id).subscribe({
      next: () => {
        this._alert.success("Cita cancelada correctamente");
        this.getAppointmentById();
      }, error: () => {
        this._alert.error("tenemos problemas, intentalo mas tarde")
      }
    })
  }


}
