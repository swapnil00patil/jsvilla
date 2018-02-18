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
  subscribers: any = {};

  constructor(private postService: PostService, private router: Router) {
  
  }

  ngOnInit() {
    this.getPosts(this.type, this.unique, 0);
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // you're at the bottom of the page
        this.getPosts(this.type, this.unique);
      }
    };
  }

  ngAfterViewInit() {
    this.subscribers.router = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url === '/' || event.url.includes('--')) {
          let params = event.url.replace('/', '').split('--');
          this.type = params[0];
          this.unique = params[1];
          this.posts = [];
          this.getPosts(this.type, this.unique, 0);
        }
      }
    })
  }

  ngOnDestroy(){
    this.subscribers.router.unsubscribe();
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
