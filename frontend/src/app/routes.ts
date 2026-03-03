import { createBrowserRouter } from 'react-router';
import { Dashboard } from './components/Dashboard';
import { Library } from './components/Library';
import { AddBook } from './components/AddBook';
import { NotFound } from './components/NotFound';
import { BookDetail } from './components/BookDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Dashboard,
  },
  {
    path: '/library',
    Component: Library,
  },
  {
    path: '/add-book',
    Component: AddBook,
  },
  {
    path: '/book/:id',
    Component: BookDetail,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);