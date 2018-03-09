export class Post {
    id: number;
    title: string;
    posted_date: string;
    unique_value: string;
}

export class Tag {
  id: number;
  title: string;
  selected: boolean;
  unique_value: string;
  description: string;
}
export class Author {
  id: number;
  name: string;
  unique_value: string;
  description: string;
}
export class TagsAuthors {
  tags: Array<Tag>;
  authors: Array<Author>;
}

export class PostRequest {
  constructor(
    public title: string = '',
    public description: string = '',
    public url: string = '',
    public tags: Tag[] = [], 
    public demo_url?: string, 
    public posted_date?: string, 
    public author_id?: number
  ) {  }

}
export class AuthorRequest {
  constructor(
    public name: string = ''
  ) {  }

}