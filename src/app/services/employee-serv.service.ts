import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServService {

  constructor(private http : HttpClient) { }

  addEmployee(data : any): Observable<any>{
    return this.http.post("http://localhost:3000/employee", data)
  }

  getAllEmployee(): Observable<any>{
    return this.http.get("http://localhost:3000/employee");
  }

  deleteById(id : any): Observable<any>{
     return this.http.delete("http://localhost:3000/employee/"+id);
  }
  editEmployee(id:any,data : any): Observable<any>{
    return this.http.put("http://localhost:3000/employee/"+id, data);
  }
}
