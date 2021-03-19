import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetEmployeeListService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get<any>(`${this.url}/empLst`)
      .toPromise()
      .then(data => { return data; });
  }

  addEmployee(empData: object) {
    return this.http.post<any>(`${this.url}/empLst`, empData)
      .toPromise()
      .then(data => { return data; });
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(`${this.url}/empLst/${id}`)
      .toPromise()
      .then(data => { return data; });
  }

  updateEmployee(id: number, empData: object) {
    return this.http.put<any>(`${this.url}/empLst/${id}`, empData)
      .toPromise()
      .then(data => { return data; });
  }

  getAllProfiles() {
    return this.http.get<any>(`${this.url}/profile`)
      .toPromise()
      .then(data => { return data; });
  }

  addProfile(loginObj: object) {
    return this.http.post<any>(`${this.url}/profile`, loginObj)
      .toPromise()
      .then(data => { return data; });
  }

}
