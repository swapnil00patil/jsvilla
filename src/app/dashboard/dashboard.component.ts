import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Meta } from '@angular/platform-browser';

import { Post } from '../services/post';
import { PostService } from '../services/post.service'
import { validateConfig } from '@angular/router/src/config';
declare let ga: any;

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
  infoLine = '';

  constructor(private postService: PostService, 
    private router: Router,
    private metaService: Meta) {
  
  }

  ngOnInit() {
    this.callGetPost(this.router.url);
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
        this.callGetPost(event.url);
      }
    })
  }

  callGetPost(url) {
    if(url === '/' || url.includes('--')) {
      let params = url.replace('/', '').split('--');
      this.type = params[0];
      this.unique = params[1];
      this.posts = [];
      this.getPosts(this.type, this.unique, 0);
      this.infoLine = this.unique.split('-').join(' ') + ' Article\'s';
    }
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

  updateMeta(meta) {
    this.metaService.updateTag({
      content: meta.title.trim()
    },
     "name='title'"
    );
    this.metaService.updateTag({
      content: meta.description.replace(new RegExp('</ br>', 'g'), '.').trim()
    },
     "name='description'"
    );
  }

}
