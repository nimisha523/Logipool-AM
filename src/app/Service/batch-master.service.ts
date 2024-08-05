import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchMasterService {

  baseurl="http://localhost:8080/BatchMaster";

  constructor(private http:HttpClient) { }

  addBatch(data:any) : Observable<any>{
    console.log(data, "Batchdata");
    return this.http.post(this.baseurl+`/addBatch`,data);
  }

  getBatchList() : Observable<any>{
    return this.http.get(this.baseurl+`/getBatch`);
  }

  deleteBatch(id:number): Observable<any>{
    return this.http.delete(this.baseurl+`/deleteBatch/${id}`);
  }

  updateBatch(id:number,data:any) : Observable<any>{
    return this.http.put(this.baseurl+`/updateBatch/${id}`,data);
  }
  
}
