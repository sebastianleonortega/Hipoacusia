import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../../../core/services/alert.service";
import {MatDialog} from "@angular/material/dialog";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReminderService} from "../../service/reminder.service";
import {LocalTime} from "js-joda";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  medicationList: boolean = true;

  medicines = [
    { 'id': 1, 'nombre': 'Alprazolam 0.25mg Tableta' },
    { 'id': 2, 'nombre': 'Alprazolam 0.5mg Tableta' },
    { 'id': 3, 'nombre': 'Clonazepam 0.5mg Tableta' },
    { 'id': 4, 'nombre': 'Clonazepam 2.5mg/mL Solución Oral' },
    { 'id': 5, 'nombre': 'Clonazepam 2mg Tableta' },
    { 'id': 6, 'nombre': 'Clozapina 100mg Tableta' },
    { 'id': 7, 'nombre': 'Clozapina 25mg Tableta' },
    { 'id': 8, 'nombre': 'Diazepam 10mg Tableta' },
    { 'id': 9, 'nombre': 'Diazepam 10mg/2mL Solución Inyectable' },
    { 'id': 10, 'nombre': 'Fenobarbital 100mg Tableta' },
    { 'id': 11, 'nombre': 'Fenobarbital 4% Elixir' },
    { 'id': 12, 'nombre': 'Fentanilo 0.5mg/10mL Solución Inyectable' },
    { 'id': 13, 'nombre': 'Ketamina 5% Solución Inyectable' },
    { 'id': 14, 'nombre': 'Lorazepam 2mg Tableta' },
    { 'id': 15, 'nombre': 'Meperidina 100mg/2mL Solución Inyectable' },
    { 'id': 16, 'nombre': 'Metilfenidato 10mg Tableta' },
    { 'id': 17, 'nombre': 'Metilergometrina Maleato 0.2mg/mL Solución Inyectable' },
    { 'id': 18, 'nombre': 'Midazolam 5mg/5mL Solución Inyectable' },
    { 'id': 19, 'nombre': 'Morfina Clorhidrato 10mg/mL Solución Inyectable' },
    { 'id': 20, 'nombre': 'Morfina Clorhidrato 30mg/mL Solución Oral' },
    { 'id': 21, 'nombre': 'Oxitocina 10UI Solución Inyectable' },
    { 'id': 22, 'nombre': 'Inmunoglobulina Anti Rh O250ug Solución Inyectable' },
    { 'id': 23, 'nombre': 'Insulina Cristalina 100UI/mL Suspensión Inyectable' },
    { 'id': 24, 'nombre': 'Insulina NPH 100UI/mL Suspensión Inyectable' },
    { 'id': 25, 'nombre': 'Toxoide Tetánico 40UI Suspensión Inyectable' },
    { 'id': 26, 'nombre': 'Succinil Colina 100mg/mL Solución Inyectable' },
    { 'id': 27, 'nombre': 'Acetaminofen 100 mg/mL Solución Oral' },
    { 'id': 28, 'nombre': 'Acetaminofen 500mg Tableta' },
    { 'id': 29, 'nombre': 'Acetaminofen 30 mg/mL Jarabe' },
    { 'id': 30, 'nombre': 'Acetazolamida 250mg Tableta' },
    { 'id': 31, 'nombre': 'Aciclovir 100mg/5mL Suspensión Oral' },
    { 'id': 32, 'nombre': 'Aciclovir 200mg Tableta' },
    { 'id': 33, 'nombre': 'Aciclovir 3% Ungüento Oftálmico' },
    { 'id': 34, 'nombre': 'Aciclovir 5% Ungüento Tópico' },
  ]

  public reminderForm: FormGroup = new FormGroup({});

  reminders: any;

  constructor(
    private _alert : AlertService,
    public dialog: MatDialog,
    public reminder: ReminderService,
  ) { }

  ngOnInit(): void {

    this.initFormReminder();
    this.getAllReminder();
  }

  initFormReminder(): void {
    this.reminderForm = new FormGroup({
      nameMedicine: new FormControl(null, [Validators.required]),
      time: new FormControl('', [Validators.required, ]),

    });
  }

  showFormAndReminder() {
    this.medicationList = !this.medicationList;
  }

  onSubmit() {
    if (this.reminderForm.valid) {

      const data: any = {
        medicine: this.reminderForm.get('nameMedicine')?.value,
        time: this.reminderForm.get('time')?.value,
        date: "2023-11-30",
        user: { id: 1 },
      }
      this.reminder.createReminder(data).subscribe({
        next: () => {
          this.medicationList = true;
          this.getAllReminder();
          this.reminderForm.reset();
          this._alert.success("Recordatorio agregado");

        }
      })


    }
  }

  getAllReminder(){
    this.reminder.getAllReminder().subscribe({
      next: (data) => {
        this.reminders = data;
      }
    })
  }


  close(): void {
    this.dialog.closeAll();
  }

  deleteReminder(value: string){
    const index = this.reminders.indexOf(value)
    if (index !== -1){
      let id = this.reminders[index].id;

      this.reminder.deleteReminder(id).subscribe({
        next : () =>{
          this.reminders.splice(index, 1)
          this._alert.success("Recordatorio eliminado correctamente")
        }
      })
    }

  }



}

interface ReminderInterface {
  id: number,
  medicine: string,
  date: Date,
  time: LocalTime,
  user: {
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    typeOfHearingLoss: string,
    previousTreatments: string
  }
}
