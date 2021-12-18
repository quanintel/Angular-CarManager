import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
})
export class CarEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  InforCar: any = {};
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.restApi.getCar(this.id).subscribe((data: {}) => {
      this.InforCar = data;
    });
  }
   // Cập nhật thông tin xe
   updateCar() {
    if(window.confirm('Bạn có chắc chắn muốn cập nhật ?')){
      this.restApi.updateCar(this.id, this.InforCar).subscribe(data => {
        this.router.navigate(['/list-car'])
      })
    }
  }
}
