import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';

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
    private location: Location,
    private metaService: Meta) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const unique = this.route.snapshot.paramMap.get('unique');
    this.postService.getPost(unique)
    .subscribe(response => {
      this.post = response[0];
      this.updateMeta(this.post);
      if(!this.post) {
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  updateMeta(post) {
    this.metaService.updateTag({
      content: post.title.trim()
    },
     "name='title'"
    );
    this.metaService.updateTag({
      content: post.description.replace(new RegExp('</ br>', 'g'), '.').trim()
    },
     "name='description'"
    );
  }

}
