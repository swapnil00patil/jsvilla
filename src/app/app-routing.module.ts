import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PostdetailComponent }   from './post-detail/postdetail.component';
import { AddpostComponent }   from './add-post/addpost.component';

const routes: Routes = [
  { path: 'post/:unique', component: PostdetailComponent },
  { path: 'addpost/swapgayuswara', component: AddpostComponent },
  { path: ':type-:unique', component: DashboardComponent },
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
