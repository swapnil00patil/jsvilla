import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from './post';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostService {

    private getPostsUrl = '/posts';
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
        this.cachedPosts = posts.reduce(function(map, obj) {
            map[obj.id] = obj;
            return map;
        }, {});
    }
}