import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';
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
    private cachedTags;
    private cachedAuthors;
    private offset = 0;

    constructor(private http: HttpClient) { }

    getPosts(type, unique, offset?): Observable<Post[]> {
        if (offset === 0) {
            this.offset = offset;
        } else if (this.offset === -1) {
            return Observable.from([]);
        }
        let post = {
            offset: this.offset,
            type: type,
            unique: unique
        }
        return this.http.post<Post[]>(this.getPostsUrl, post, httpOptions)
            .pipe(
                tap(posts => {
                    this.log(`fetched POSTS`);
                    this.offset = posts.length === 0 ? -1 : (this.offset + posts.length);
                    this.cachedPosts = this.cacheAsMap(posts);
                }),
                catchError(this.handleError('getPosts', []))
            );
    }

    getPost(id): Observable<Post[]> {
        if (this.cachedPosts && this.cachedPosts[id]) {
            return Observable.from([[this.cachedPosts[id]]]);
        } else {
            return this.getPosts('single', id)
        }
    }

    getTag(id): Tag {
        if (this.cachedTags && this.cachedTags[id]) {
            return this.cachedTags[id]
        }
    }

    getAuthor(id): Author {
        if (this.cachedAuthors && this.cachedAuthors[id]) {
            return this.cachedAuthors[id]
        }
    }

    getTagsAuthors(limit): Observable<TagsAuthors> {
        return this.http.get<any>(this.getTagsAuthorsUrl + '/' + limit)
            .pipe(
                tap(response => {
                    this.log(`fetched TAGS AUHTORS`);
                    this.cachedTags = this.cacheAsMap(response.tags);
                    this.cachedAuthors = this.cacheAsMap(response.authors);
                }),
                catchError(this.handleError('getTags', []))
            );
    }

    savePost(post: PostRequest): Observable<Post> {
        let posted = post.posted_date;
        post.posted_date = moment(posted).format('YYYY-MM-DD hh:mm:ss');
        return this.http.post<Post>(this.getPostsUrl + '/save', post, httpOptions).pipe(
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

    private cacheAsMap(items: any[], byId = false) {
        return items.reduce(function (map, obj) {
            byId ? map[obj.id || obj.unique_value] = obj : map[obj.unique_value || obj.id] = obj;
            return map;
        }, {});
    }
}