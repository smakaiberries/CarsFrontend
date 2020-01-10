import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private http: HttpClient;
  constructor(http: HttpClient) { 
    this.http = http;
  }

  getFeatures(){
    return this.http.get('/api/features')
  }
}
