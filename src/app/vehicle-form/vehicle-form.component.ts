import * as _ from 'underscore';
import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../services/vehicle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import {SaveVehicle, Vehicle} from '../models/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  };

  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService) {
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    });
  }

  ngOnInit() {

    Observable.forkJoin([
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
      this.vehicleService.getVehicle(this.vehicle.id)
    ]).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      this.setVehicle(data[2] as Vehicle);
      this.populateModels();
    });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }


  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle).subscribe(() => console.log('update successful'));
    }

    this.vehicleService.create(this.vehicle).subscribe(
      x => console.log(x));
  }

  delete(){
    if (confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id);
    }
  }

}

