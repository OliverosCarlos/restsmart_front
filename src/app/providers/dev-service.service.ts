import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; //modulo para poder pedir datos
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevServiceService {
  
  API_URI = 'http://localhost:3001/api';
  
    httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':  'application/json',
      //   'Authorization': 'my-auth-token'
    }),
    params: new HttpParams()
  };


  constructor( private http: HttpClient) { }

  request(route) {
    return this.http.get(`${this.API_URI}/${route}`);
  }

  requestBody(route,body: any) {
    this.httpOptions.headers.set('Content-Type', 'application/json');
    this.httpOptions.headers.append('Accept', 'application/json');
    return this.http.post(`${this.API_URI}/${route}`, body,this.httpOptions);
  }

  requestBy(route,id: string) {
    return this.http.get(`${this.API_URI}/${route}/${id}`);
  }

  requestDelete(route,id: string) {
    return this.http.delete(`${this.API_URI}/${route}/${id}`);
  }

  requestBodyBy(route, body: any, id: string|number): Observable<any> {
    return this.http.put(`${this.API_URI}/${route}/${id}`, body);
  }

}
