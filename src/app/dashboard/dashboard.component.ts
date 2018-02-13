import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { DashboardService } from './dashboard.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: Post[];
  constructor(private heroService: DashboardService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.heroService.getPosts()
    .subscribe(posts => this.posts = posts);
  }

}
