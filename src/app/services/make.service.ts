import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MakeService {
  private http: HttpClient;
  constructor(http: HttpClient) { 
    this.http = http;
  }

  getMakes(){
    return this.http.get('https://localhost:44368//api/makes');
  }
}