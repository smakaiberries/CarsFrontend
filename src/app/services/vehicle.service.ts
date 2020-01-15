import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SaveVehicle, Vehicle} from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getMakes() {
    return this.http.get<any[]>('https://localhost:44368/api/makes');
  }

  getFeatures() {
    return this.http.get<any[]>('https://localhost:44368/api/vehicles/features');
  }

  create(vehicle){
    return this.http.post('https://localhost:44368/api/vehicles', vehicle);
  }

  getVehicle(id){
    return this.http.get('https://localhost:44368/api/vehicles/' + id);
  }

  update(vehicle: SaveVehicle) {
    return this.http.put('https://localhost:44368/api/vehicles/' + vehicle.id, vehicle);
  }

  delete(id){
    return this.http.delete('https://localhost:44368/api/vehicles/' + id);
  }

  getVehicles(){
    return this.http.get<Vehicle[]>('https://localhost:44368/api/vehicles/');
  }
}
