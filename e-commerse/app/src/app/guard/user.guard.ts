import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor( private _auth:AuthService ,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      this._auth.getUserStatus().subscribe(
        res=>{
          if(res){ 
            this.router.navigateByUrl('home')
            localStorage.setItem('userID' , res.uid)
          }
        }
      )
      
       
    return true;
  }
  
}
