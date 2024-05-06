import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {DoctorRes} from "../../../auth/interface/home.interface";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost:8009/';

  constructor(private http: HttpClient) { }

  public createAppointment(data: any):Observable<any>{
    return this.http.post(this.apiUrl+"appointments", data);
  }

  getDoctorById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl+"user/doctor/"+id);
  }
}
