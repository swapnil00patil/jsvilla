import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PostdetailComponent }   from './post-detail/postdetail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'post/:id', component: PostdetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
