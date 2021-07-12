import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit , AfterContentInit {
   
  isOpen= false
  constructor( private _auth:AuthService, private _router:Router) { 
     
  }
  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    //this.checkLogin()
  }
  logOut(){
    this._auth.logOut().then(
      res=>{
        localStorage.setItem('userID' , '')
        this._router.navigateByUrl("login")
      }
    )
  }
  // checkLogin(){
  //   this.email = localStorage.getItem("email")
  //   this.password = localStorage.getItem("password")
  //   console.log(this.email)
  //   if(this.email != undefined && this.password != undefined){
  //     this.flag =true
  //     this.state = "sign out"
  //   }
  // }
  toggle(){
    this.isOpen = ! this.isOpen
  }

}
