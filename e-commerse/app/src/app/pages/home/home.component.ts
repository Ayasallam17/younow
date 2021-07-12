import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';
import { UserService } from 'src/app/services/user/user.service';

 @Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = []
  comments : any[] = []
  clickComment = false
  data:any
  commentForm!: FormGroup;
  likeCount = 0
  urls = '';
  isClick=false
  constructor(private db:AngularFirestore , private _auth:AuthService,
    private _user:UserService
    ) {
  } 

  ngOnInit(): void {
    this.getPosts()
    this.getImages()
    this.commentForm= new FormGroup({
      comment: new FormControl('')
    })
  }
  getImages(){ 
    this._auth.getUserInfo().subscribe(
      res=>{
        let path = `/images/${res?.uid}/`
        this._user.getUrl(path).then(
          d=>{
            // d.prefixes.forEach(folderRef =>{
            //   console.log(folderRef)
            // })
            d.items.forEach(itemRef=>{
              itemRef.getDownloadURL().then(
                url=>{
                  this.urls = url
                }
              )
            })
          }
        )
      }
    )}
  showMenu(){
    this.isClick=! this.isClick
  }

  showComments(postUserId:any){
    this.clickComment =true
    this._user.getComment(postUserId).subscribe( 
      res=>{
        this.comments = res.map(ele=>{
          return {
            id:ele.payload.doc.id,
            Data: ele.payload.doc.data()
          }
        })
        console.log(this.comments)
    }
  )
  }
   
  // showComments(postUserId:any){
  //   this.clickComment =true
  //   this._user.getComment(postUserId).subscribe( 
  //     res=>{
  //     res.forEach(ele=>{ 
  //       this.comments.push(ele.data())
  //     })
  //   }
  // )
  // }
  
  addComment(postUserId:any){
    console.log(postUserId)
    let commentData = this.commentForm.value.comment
    this._auth.getUserInfo().subscribe(
      res=>{
        this._user.addComment(postUserId , res?.uid , commentData )
        
      }
    )
    this.commentForm.reset()
  }
   
  getPosts(){
    this._user.getAllPostsId().subscribe(
      res=>{
        res.forEach(ele=>{
          this._user.getallPostsContent(ele.id).subscribe(
            res=>{
              res.map(ele=>{
                console.log(ele.payload.doc.data())
                this.posts.push(ele.payload.doc.data())
              })
            }
          )
          
        }

        )
        // this.posts = res.map(ele=>{
        //   return {
        //     ele
        //   }
        // })
    }
    )

  }
    //      forEach(ele=>{
    //       console.log(ele.data())
    //     })
    //   }
    // )
    //  doc().ref.collection('userPosts').get().then(
    //   res=>{ 
    //     console.log(res.size)
    //   } 
      // docs.map(
      //   ele=>{
      //     console.log(ele.data())
      //   }
      // )
      // }

  

}
