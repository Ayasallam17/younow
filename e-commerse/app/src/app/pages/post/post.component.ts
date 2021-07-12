import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms'
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postForm!: FormGroup;
  data:any
  selectedFile!: File;
  imageUrl:any
  docID = ""
  constructor(private _auth:AuthService , private _router:Router, private _user:UserService) {
    
  }

  ngOnInit(): void {
    this.getDocId()
    this.postForm= new FormGroup({
      content: new FormControl('')
    })
  }
  onFileSelected(event:any){
    this.selectedFile = <File>event.target.files[0]
    console.log(this.selectedFile.name)
  }
  getDocId(){
    const uId = localStorage.getItem('userID')
    const docID= this._user.getDocId(uId).ref.id
    this.docID = docID

  }
  async addPost(){
     
    let postData = this.postForm.value
    this._auth.getUserInfo().subscribe(
      async res=>{
        if(postData.content){ 
          if(this.selectedFile){
            const snap = await this._user.uploadFile(`/images/${res?.uid}/${this.selectedFile.name}`,this.selectedFile)
            await this._user.getUploadImageUrl(snap).then(
              url=>{
                this.imageUrl =url
                console.log(url)
              }
            )
            this._user.addPost(res?.uid , postData.content , this.imageUrl ,this.docID ).then(
              res=>{
                console.log("done")
              }
            )
          }else{ 
          this._user.addPost(res?.uid , postData.content , "" , this.docID).then(
            res=>{
              console.log(res)
            }
          )}
        }
      }
    )
  }
  // console.log(form.value)
    // this.data ={ ...form.value ,"likes":0}
    // this._http.addPost(this.data).subscribe(
    //   res=>{
    //     window.location.reload()
    //   }
    // )


}
