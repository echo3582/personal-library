import { get, post } from './http';

// 对应 backend/app/schemas/book.py 中的 BookOut
export interface BookFromApi {
  id: number;
  title: string;
  author?: string | null;
  publisher?: string | null;
  isbn?: string | null;
  summary?: string | null;
  clc_code?: string | null;
  status?: string | null;
  // 逗号分隔存储的标签字符串，例如 "日本文学,小说"
  tags?: string | null;
}

// 对应 BookCreate
export interface CreateBookPayload {
  title: string;
  author?: string;
  publisher?: string;
  isbn?: string;
  summary?: string;
  clc_code?: string;
  status?: string;
  // 发送给后端的逗号分隔标签字符串
  tags?: string;
}

export async function fetchBooks(): Promise<BookFromApi[]> {
  return get<BookFromApi[]>('/books');
}

export async function createBook(payload: CreateBookPayload): Promise<BookFromApi> {
  return post<BookFromApi>('/books', payload);
}

