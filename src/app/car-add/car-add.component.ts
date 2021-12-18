import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
})
export class CarAddComponent implements OnInit {
  @Input() InforCar = {
    name: '',
    seat: '',
    origin: '',
    engine: '',
    platesize: '',
  };

  constructor(public restApi: RestApiService, public router: Router) {}

  ngOnInit(): void {}

  addCar() {
    this.restApi.createCar(this.InforCar).subscribe((data: {}) => {
      this.router.navigate(['/list-car']);
    });
  }
}
