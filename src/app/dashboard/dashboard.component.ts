import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from "@angular/router";

import { Post } from '../services/post';
import { PostService } from '../services/post.service'
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  type: String = '';
  unique: String = '';

  constructor(private postService: PostService, private router: Router) { 
    router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        let params = event.url.replace('/','').split('--');
          this.type = params[0];
          this.unique = params[1];
          this.posts = [];
          this.getPosts(this.type, this.unique, 0);
      }
    })
  }

  ngOnInit() {
    // this.getPosts();
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // you're at the bottom of the page
        this.getPosts(this.type, this.unique);
      }
    };
  }

  getPosts(type, unique, offset?): void {
    this.postService.getPosts(type, unique, offset)
      .subscribe(posts => {
        posts.forEach((post) => {
          this.posts.push(post)
        })
      });
  }

}
