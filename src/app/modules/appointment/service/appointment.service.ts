import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8009/security/appointment/';


  constructor(private http: HttpClient) { }

  getAllAppointment() {
    return this.http.get(this.apiUrl);
  }

  getAppointmentById(id: string): Observable<any> {
    return this.http.get(this.apiUrl+ 'person/' + id);
  }

  deleteAppointment(id: any){
    return this.http.delete(this.apiUrl+id)
  }
}
