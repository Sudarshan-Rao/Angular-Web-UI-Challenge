import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Book } from '@tmo/shared/models';
import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffects {
  searchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.searchBooks),
      switchMap((action: { term: string }) => {
        if (!action.term || action.term.length === 0) {
          return of(BooksActions.searchBooksSuccess({ books: [] }));
        }
        const params = new HttpParams().set('q', action.term);
        return this.http.get<Book[]>(`/api/books/search`, { params }).pipe(
          map((data) => BooksActions.searchBooksSuccess({ books: data })),
          catchError((error) => of(BooksActions.searchBooksFailure({ error })))
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}
}
