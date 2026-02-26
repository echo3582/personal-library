import { createBrowserRouter } from 'react-router';
import { Dashboard } from './components/Dashboard';
import { Library } from './components/Library';
import { AddBook } from './components/AddBook';
import { NotFound } from './components/NotFound';

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
    path: '*',
    Component: NotFound,
  },
]);