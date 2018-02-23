import { Component, OnInit } from '@angular/core';

import { Post, Tag, Author } from '../services/post';
import { PostService } from '../services/post.service'
import { deviceType } from "../utils";

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {
  tags: Tag[];
  authors: Author[];
  showMenu: boolean;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getTagsAuthors();
    this.showMenu = !deviceType.mobile();
  }

  getTagsAuthors(): void {
    this.postService.getTagsAuthors(20)
    .subscribe(response => {
      this.tags = response.tags;
      this.authors = response.authors;
    });
  }

  toggleMenu() {
    if(deviceType.mobile()) {
      this.showMenu = !this.showMenu;
    }
  }
}
