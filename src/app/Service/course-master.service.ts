import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseMasterService {

  baseurl="http://localhost:8080/CourseMaster";

  constructor(private http:HttpClient) { }

  addCourse(data:any) : Observable<any>{
    return this.http.post(this.baseurl+`/addCourse`,data);
  }

  getCourseList() : Observable<any>{
    return this.http.get(this.baseurl+`/getCourse`);
  }

  deleteCourse(id:number): Observable<any>{
    return this.http.delete(this.baseurl+`/deleteCourse/${id}`);
  }

  updateCourse(id:number,data:any) : Observable<any>{
    return this.http.put(this.baseurl+`/updateCourse/${id}`,data);
  }
}
