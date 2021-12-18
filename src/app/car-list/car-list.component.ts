import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
})
export class CarListComponent implements OnInit {
  Car: any = [];

  constructor(public restApi: RestApiService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  // Lấy danh sách xe
  loadCars() {
    return this.restApi.getCars().subscribe((data: {}) => {
      this.Car = data;
    });
  }

  // Xoá thông tin xe
  deleteCar(id: number) {
    if (window.confirm('Bạn chắc chắn muốn xoá không ?')){
      this.restApi.deleteCar(id).subscribe(data => {
        this.loadCars()
      })
    }
  }
}
