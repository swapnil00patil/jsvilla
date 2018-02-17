import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post, PostRequest, Tag, Author, AuthorRequest } from '../services/post';
import { PostService } from '../services/post.service'

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  post: Post;
  tags: Tag[];
  authors: Author[];
  model = new PostRequest()
  author = new AuthorRequest()
  showAuthorForm= false
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getTags()
  }

  savePost() { 
    this.postService.savePost(this.model)
    .subscribe(post => {
      console.log(post)
    });
  }

  saveAuthor() { 
    this.postService.saveAuthor(this.author)
    .subscribe(author => {
      console.log(author)
    });
  }
  
  onChange(tag:Tag, isChecked: boolean) {
    console.log(this.model)
    if (isChecked) {
      this.model.tags.push(tag)
    } else {
      this.model.tags = this.model.tags.filter ((tagLoop) => tagLoop.id !== tag.id)
    }
  }

  getTags(): void {
    this.postService.getTagsAuthors(0)
    .subscribe(response => {
      this.tags = response.tags
      this.authors = response.authors
    });
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
