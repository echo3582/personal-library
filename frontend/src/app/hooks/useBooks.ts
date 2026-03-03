import { useEffect, useState } from 'react';
import { fetchBooks, type BookFromApi } from '../services/books';

interface UseBooksResult {
  books: BookFromApi[];
  loading: boolean;
  error: Error | null;
}

export function useBooks(): UseBooksResult {
  const [books, setBooks] = useState<BookFromApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchBooks();
        if (!cancelled) {
          setBooks(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { books, loading, error };
}

