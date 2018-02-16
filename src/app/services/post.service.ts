import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import moment from 'moment/src/moment'

import { Post, Tag, PostRequest, TagsAuthors, AuthorRequest, Author } from './post';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostService {

    private getPostsUrl = '/posts';
    private getTagsAuthorsUrl = '/tags/authors'
    private getAuthorsUrl = '/authors'
    private cachedPosts;

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.getPostsUrl)
            .pipe(
            tap(posts => {
                this.log(`fetched POSTS`);
                this.cachAsMap(posts);
            }),
            catchError(this.handleError('getPosts', []))
            );
    }

    getPost(id): Post {
        return this.cachedPosts ? this.cachedPosts[id] : '';
    }

    savePost(post: PostRequest): Observable<Post> {
        let posted = post.posted_date;
        post.posted_date = moment(posted).format('YYYY-MM-DD hh:mm:ss');
        return this.http.post<Post>(this.getPostsUrl, post, httpOptions).pipe(
            tap((post: Post) => this.log(`added post w/ id=${post.id}`)),
            catchError(this.handleError<Post>('addPost'))
        );
    }

    saveAuthor(author: AuthorRequest): Observable<Author> {
        return this.http.post<Author>(this.getAuthorsUrl, author, httpOptions).pipe(
            tap((author: Author) => this.log(`added post w/ id=${author.id}`)),
            catchError(this.handleError<Author>('addAuthor'))
        );
    }


    getTagsAuthors(): Observable<TagsAuthors> {
        return this.http.get<any>(this.getTagsAuthorsUrl)
            .pipe(
            tap(tags => {
                this.log(`fetched TAGS`);
            }),
            catchError(this.handleError('getTags', []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log('DashboardService: ' + message);
    }

    private cachAsMap(posts: Post[]) {
        this.cachedPosts = posts.reduce(function (map, obj) {
            map[obj.post_unique_url] = obj;
            return map;
        }, {});
    }
}