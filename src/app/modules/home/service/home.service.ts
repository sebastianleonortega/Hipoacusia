import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8009/';

  constructor(private http: HttpClient) {
  }


  public getAllDoctor():Observable<any>{
    return this.http.get(this.apiUrl + "user/doctor/");
  }

}
