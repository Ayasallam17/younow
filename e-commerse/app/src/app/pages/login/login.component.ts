import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  email:any
  password:any
  data:any
  constructor( private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email" : new FormControl(''),
      "password" : new FormControl('')
    })
  }
  login(){
    //console.log(this.loginForm.value)
    let data = this.loginForm.value
    this._auth.signIn( data.email , data.password).then(
      res=>{
        console.log(res)
        this._router.navigateByUrl("home")
      }
    )
    this.loginForm.reset()

  }






  // login(){
  //   this.email = this.loginForm.value.email
  //   this.password = this.loginForm.value.password
  //   this._http.login(this.email , this.password).subscribe(
  //     res=>{
  //       this.data = res
  //       console.log(this.data[0].id)
  //       this.email=this.data[0].email
  //       this.password = this.data[0].password
  //       if(this.data != undefined){
  //         localStorage.setItem("email",this.email)
  //         localStorage.setItem("password",this.password)
  //         this._router.navigateByUrl("")
  //       }
  //       else{
  //         alert("no auther")
  //       }
  //     }
       
  //   )
  // }

}
