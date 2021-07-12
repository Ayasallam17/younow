import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
//import { aut } from 'firebase/app'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private afAuth:AngularFireAuth) { 
    
  }

  signUp(email:any , password:any){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }
  signIn(email:any , password:any){
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }
  logOut(){
    return this.afAuth.signOut()
  }
  getUserInfo(){
    return this.afAuth.user
  }
  getUserStatus(){
    return this.afAuth.authState
  }
}
