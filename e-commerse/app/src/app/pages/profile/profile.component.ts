import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts:any[] = []
  onepost= false
  generalInfo :any
  isClick = false;
  content =false
  image = false
  post = false
  constructor(private _user:UserService , private auth:AuthService) { }

  ngOnInit(): void {
    this.getUserProfile()
  }
  
  deletePost(docID:any){
    const uid = localStorage.getItem('userID')
    console.log(uid)
    this._user.deletePost(uid).subscribe(
      res=>{
        //console.log(res.forEach)
        res.query.where('docID' , '==' , `${docID}`).get().then( 
        res=>{
          // console.log(res)
          res.forEach(doc=>{
            doc.ref.delete()
            this.post = false
          })
        })
      }
    )
  }

  getUserProfile(){
    const uid = localStorage.getItem('userID')
        this._user.getUserPosts(uid).subscribe(
          res=>{
            console.log(res)
            if(res){ 
            this.posts =res
            this.content = true
            this.image = true
            this.post = true
          }
          }
        )
        // this._user.getUserInfo(uid).subscribe(
        //   res=>{
        //     this.generalInfo = res  // first and last name
        //   }
        // ) 
  }   
  showMenu(){
    this.isClick=! this.isClick
  }
     
  

}
