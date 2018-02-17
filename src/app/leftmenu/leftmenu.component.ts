import { Component, OnInit } from '@angular/core';

import { Post, Tag, Author } from '../services/post';
import { PostService } from '../services/post.service'

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {
  tags: Tag[];
  authors: Author[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getTagsAuthors();
  }

  getTagsAuthors(): void {
    this.postService.getTagsAuthors(5)
    .subscribe(response => {
      this.tags = response.tags
      this.authors = response.authors
    });
  }

}
