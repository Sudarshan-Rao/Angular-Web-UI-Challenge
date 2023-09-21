import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, takeUntil, tap } from 'rxjs/operators';
import * as ReadingListActions from './reading-list.actions';

const snackbarConfig = {
  duration: 3000,
  actionButtonText: 'Undo',
};

@Injectable()
export class SnackBarEffects {
  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      tap(({ book }) =>
        this.snackBar
          .open(`${book.title} added to reading list`, snackbarConfig.actionButtonText, {
            duration: snackbarConfig.duration,
          })
          .onAction()
          .pipe(takeUntil(this.snackBar._openedSnackBarRef.afterDismissed()),map(() => ReadingListActions.addToReadingListUndo({ book })))
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      tap(({ item }) =>
        this.snackBar
          .open(`${item.title} removed from reading list`, snackbarConfig.actionButtonText, {
            duration: snackbarConfig.duration,
          })
          .onAction()
          .pipe(
            takeUntil(this.snackBar._openedSnackBarRef.afterDismissed()),
            map(() => ReadingListActions.removeFromReadingListUndo({ item }))
          )
      )
    )
  );
  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}