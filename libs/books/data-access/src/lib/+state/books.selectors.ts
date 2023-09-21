import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BOOKS_FEATURE_KEY,
  booksAdapter,
  BooksPartialState,
  State
} from './books.reducer';
import { Book } from '@tmo/shared/models';

export const getBooksState = createFeatureSelector<BooksPartialState, State>(
  BOOKS_FEATURE_KEY
);

const { selectAll } = booksAdapter.getSelectors();

export const getBooksLoaded = createSelector(
  getBooksState,
  (state: State): boolean => state.loaded
);

export const getBooksError = createSelector(
  getBooksState,
  (state: State): string | null | undefined => state.error
);

export const getBooks = createSelector(
  getBooksState,
  selectAll as (state: State) => Book[]
);

export const getSearchTerm = createSelector(
  getBooksState, 
  (state: State) => state.searchTerm
);
