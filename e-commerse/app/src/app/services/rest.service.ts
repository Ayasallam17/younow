import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private _http:HttpClient) { 

  }
  commonUrl : string="http://localhost:3000"
  getPost():Observable<any>{
    return this._http.get(`${this.commonUrl}/Posts`)
  }
  login(email:any, password:any){
    return this._http.get(`${this.commonUrl}/User?email=${email}&password=${password}`)
  }
  addPost(data:any):Observable<any>{
    return this._http.post(`${this.commonUrl}/Posts` , data)
  }
  likePost(data:any , id:any):Observable<any>{
    console.log(data)
    return this._http.put(`${this.commonUrl}/Posts/${id}`, data)
  }
}
