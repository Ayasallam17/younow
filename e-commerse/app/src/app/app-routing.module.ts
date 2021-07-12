import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guard/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path : "" , component:LoginComponent , canActivate:[UserGuard]},
  {path : "home" , component:HomeComponent},
  {path : "addpost" , component:PostComponent},
  {path : "profile" , component:ProfileComponent},
  {path : "login" , component:LoginComponent},
  {path :  "register" , component:RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
