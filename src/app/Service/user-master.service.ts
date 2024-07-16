import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  baseurl="http://localhost:8080/UserMaster";

  constructor(private http:HttpClient) { }

  addUser(data:any) : Observable<any>{
    return this.http.post(this.baseurl+`/addUserMaster`,data);
  }

  getUserList() : Observable<any>{
    return this.http.get(this.baseurl+`/getUserMaster`);
  }

  deleteUser(id:number): Observable<any>{
    return this.http.delete(this.baseurl+`/deleteUser/${id}`);
  }

  updateUser(id:number,data:any) : Observable<any>{
    return this.http.put(this.baseurl+`updateUserMaster/${id}`,data);
  }
}
