import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PostdetailComponent }   from './post-detail/postdetail.component';
import { AddpostComponent }   from './add-post/addpost.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'post/:id', component: PostdetailComponent },
  { path: 'addpost/swapgayuswara', component: AddpostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
