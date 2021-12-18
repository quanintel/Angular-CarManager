import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from '../shared/car';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  apiURL = 'http://localhost:9001';
  constructor(private http: HttpClient) {}
  /*========================================
    THÊM SỬA XOÁ HIỂN THỊ CHO SERVICES
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Phương thức lấy tất cả danh sách ô tô
  getCars(): Observable<Car> {
    return this.http
      .get<Car>(this.apiURL + '/car')
      .pipe(retry(1), catchError(this.handleError));
  }

  // Phương thức lấy 1 oto theo ID
  getCar(id: number): Observable<Car> {
    return this.http
      .get<Car>(this.apiURL + '/car/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Phương thức tạo mới 1 thông tin oto
  createCar(car: any): Observable<Car> {
    return this.http
      .post<Car>(this.apiURL + '/car', JSON.stringify(car), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Phương thức cập nhật 1 thông tin oto
  updateCar(id: number, car: any): Observable<Car> {
    return this.http
      .put<Car>(
        this.apiURL + '/car/' + id,
        JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Phương thức xoá 1 thông tin oto
  deleteCar(id: number) {
    return this.http
      .delete<Car>(this.apiURL + '/car/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Thông báo lỗi
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Mã lỗi: ${error.status}\nThông báo: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
