import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, markAsFinished } from '@tmo/books/data-access';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readingList$ = this.store
    .select(getReadingList)
    .pipe(takeUntil(this.destroy$));

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(private readonly store: Store) {
  }

  markBookAsFinished(item) {
    this.store.dispatch(markAsFinished({ item }));
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
