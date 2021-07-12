import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage , AngularFireStorageReference} from '@angular/fire/storage';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UserService {
id:any
  constructor( private fireStore:AngularFirestore, private _http:HttpClient, private fs:AngularFireStorage) { }

  addNewUser(id:any , firstName:any, lastName:any){
    return this.fireStore.doc(`User/${id}`).set({
      firstName,
      lastName
    })
  }
  getAllPostsId(){
    return this.fireStore.collection(`Posts`).get()
  }
  getallPostsContent(postId:any){
    return this.fireStore.collection(`Posts/${postId}/userPosts`).snapshotChanges()
  }


  getDocId(uid:any){
    return this.fireStore.collection(`Posts/${uid}/userPosts`).doc()
  }
  addPost(uId:any, content:any , imageUrl:any , docID:any){
    return this.fireStore.doc(`Posts/${uId}/userPosts/${docID}`).set({
      content,
      docID,
      imageUrl
    })
  }
  addComment(postUserId:any, uid:any, content:any){
    return this.fireStore.doc(`Posts/${postUserId}/Interactions/comments/content/${uid}`).set({content})
  }
  deletePost(uid:any){
    return this.fireStore.collection(`Posts/${uid}/userPosts`).get()
  }
  getComment(postUserId:any){
    return this.fireStore.collection(`Posts/${postUserId}/Interactions/comments/content`).snapshotChanges()
  }
  getUserInfo(userId:any){
    return this.fireStore.doc(`User/${userId}`).valueChanges()
  }
  uploadFile(path:any , data:any){
    return this.fs.upload(path,data)
  }
  getUrl(path:any){ 
  const s= firebase.default.storage()
    return s.ref(`${path}`).listAll()
  }  
  
  async getUploadImageUrl(snap:firebase.default.storage.UploadTaskSnapshot){
    return await snap.ref.getDownloadURL()
  }
  getUserPosts(ui:any){
    return this.fireStore.collection(`Posts/${ui}/userPosts`).valueChanges()
  }
}
