import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup
  errorMessage = false
  constructor(private _auth:AuthService , private _user:UserService , private _router:Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "firstName" : new FormControl(''),
      "lastName" : new FormControl(''),
      "email" : new FormControl(''),
      "password" : new FormControl('')
    })
  }
  register(){
    let data:User = this.registerForm.value
    this._auth.signUp(data.email , data.password).then(
      res=>{
        //console.log(data)
        this._user.addNewUser(res.user?.uid , data.firstName, data.lastName).then(
          ()=>{
            this._router.navigateByUrl("login")
          }
        )
      },
      err=>{
        this.errorMessage = err.message
      }
    )
    //console.log(this.registerForm.value)
    //this.db.collection('Users').doc(`${this.id}`).set(this.registerForm.value)
    this.registerForm.reset()
  }

}
