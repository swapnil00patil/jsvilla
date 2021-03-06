import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  constructor(private postService: PostService,
    private metaService: Meta,
    private router: Router) { }

  ngOnInit() {
    this.getTagsAuthors();
    this.showMenu = !deviceType.mobile();
  }

  getTagsAuthors(): void {
    this.postService.getTagsAuthors(20)
    .subscribe(response => {
      this.tags = response.tags;
      this.authors = response.authors;

      let paramsArr = this.router.url.replace('/', '').split('--');
      if(paramsArr && paramsArr[0] === 'tag') {
        let tag = this.postService.getTag(paramsArr[1]);
        this.toggleMenu(tag.title, tag.description);
      } else if(paramsArr && paramsArr[0] === 'author') {
        let auhtor = this.postService.getAuthor(paramsArr[1]);
        console.log(auhtor)
        this.toggleMenu(auhtor.name, auhtor.description);
      }
    });
  }

  toggleMenu(title = '', description = '') {
    title && description && this.updateMeta({title: title, description: description});
    if(deviceType.mobile()) {
      this.showMenu = !this.showMenu;
    }
  }

  updateMeta(meta) {
    this.metaService.updateTag({
      content: meta.title.trim()
    },
     "name='title'"
    );
    this.metaService.updateTag({
      content: meta.description.replace(new RegExp('<br />', 'g'), '.').trim()
    },
     "name='description'"
    );
  }
}
