export class Post {
    id: number;
    title: string;
}

export class Tag {
  id: number;
  title: string;
  selected: boolean;
}

export class PostRequest {

  constructor(
    public title: string = '',
    public description: string = '',
    public url: string = '',
    public tags: Tag[] = [], 
    public demo_url?: string
  ) {  }

}