import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post, PostRequest, Tag } from '../services/post';
import { PostService } from '../services/post.service'

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  post: Post;
  tags: Tag[];
  model = new PostRequest()
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getTags()
  }

  onSubmit() { 
    this.model.tags = [];
    this.postService.savePost(this.model)
    .subscribe(post => {
      console.log(post)
    });
  }
  

  onChange(tag:Tag, isChecked: boolean) {
    if (isChecked) {
      this.model.tags.push(tag)
    } else {
      this.model.tags = this.model.tags.filter ((tagLoop) => tagLoop.id !== tag.id)
    }
  }

  getTags(): void {
    this.postService.getTags()
    .subscribe(tags => this.tags = tags);
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
