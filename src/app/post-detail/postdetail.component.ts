import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../services/post';
import { PostService } from '../services/post.service'

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {
  post: Post;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.post = this.postService.getPost(id);
    if(!this.post) {
      this.goBack()
    }
  }

  goBack(): void {
    this.location.back();
  }

}
