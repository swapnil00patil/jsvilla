import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { Post } from '../services/post';
import { PostService } from '../services/post.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: Post[];
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts()
    .subscribe(posts => this.posts = posts);
  }

}
