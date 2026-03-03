import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { BOOK_STATUS_LABELS, CLC_CATEGORIES, type BookStatus } from '../data/books';
import { BookForm, BookFormData } from './BookForm';
import { useBooks } from '../hooks/useBooks';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
  const { books, loading, error } = useBooks();
  const [saving, setSaving] = useState(false);
  const [localBook, setLocalBook] = useState<(typeof books)[number] | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);


  const bookFromStore = useMemo(() => {
    const bookId = Number(id);
    if (Number.isNaN(bookId)) return undefined;
    return books.find((b) => b.id === bookId);
  }, [books, id]);

  useEffect(() => {
    if (bookFromStore) setLocalBook(bookFromStore);
  }, [bookFromStore]);

  const book = localBook ?? bookFromStore;

  const tagsArray = useMemo(() => {
    if (!book?.tags) return [];
    return book.tags.split(',').map((t) => t.trim()).filter(Boolean);
  }, [book?.tags]);

  const createdAt = (book as any)?.created_at as string | undefined;

  const initialDataForForm = useMemo(() => {
    if (!book) return undefined;
    return {
      // BookForm 当前实现依赖这些字段（即使类型定义还没完全同步）
      id: String(book.id),
      title: book.title ?? '',
      author: book.author ?? '',
      clc_code: book.clc_code ?? '',
      status: ((book.status ?? 'unread') as BookStatus),
      tags: tagsArray,
      summary: book.summary ?? '',
      // 兼容 BookForm 里使用的 note 字段（后端对应 summary）
      note: book.summary ?? '',
      created_at: createdAt ?? new Date().toISOString(),
    } as any;
  }, [book, createdAt, tagsArray]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">加载失败</h1>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Link to="/library" className="text-primary hover:underline">
            返回图书馆
          </Link>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">书籍未找到</h1>
          <Link to="/library" className="text-primary hover:underline">
            返回图书馆
          </Link>
        </div>
      </div>
    );
  }

  const normalizeOptional = (value: unknown): string | null | undefined => {
    if (value == null) return undefined;
    if (typeof value !== 'string') return undefined;
    const v = value.trim();
    return v.length === 0 ? null : v;
  };

  const handleSave = async (data: BookFormData) => {
    try {
      setSaving(true);

      const tags = Array.isArray(data.tags)
        ? data.tags.map((t) => t.trim()).filter(Boolean).join(',')
        : undefined;

      // BookForm 的 textarea 目前写入的是 note 字段，这里做兼容
      const noteFromForm = (data as any).note as string | undefined;
      const summary = noteFromForm ?? data.summary;

      const payload = {
        title: normalizeOptional(data.title) ?? undefined,
        author: normalizeOptional(data.author),
        clc_code: normalizeOptional(data.clc_code),
        status: normalizeOptional(data.status),
        tags: normalizeOptional(tags),
        summary: normalizeOptional(summary),
        publisher: normalizeOptional(data.publisher),
      };

      const res = await fetch(`/api/v1/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const updated = (await res.json()) as (typeof books)[number];
      setLocalBook(updated);
      alert('书籍已更新！');
      setIsEditing(false);
    } catch (e) {
      alert(`更新失败：${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleting) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/v1/books/${book.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      alert('书籍已删除！');
      setShowDeleteModal(false);
      navigate('/library');
    } catch (e) {
      alert(`删除失败：${(e as Error).message}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    if (saving) return;
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回图书馆
          </Link>

          {!isEditing && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                编辑
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-destructive border border-border rounded-lg hover:border-destructive/50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                删除
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-8 py-12">
        {isEditing ? (
          /* Edit Mode - Using BookForm */
          <div>
            <div className="mb-8">
              <h1 className="text-3xl mb-2">编辑书籍</h1>
              <p className="text-muted-foreground">修改书籍信息</p>
              {saving && <p className="text-sm text-muted-foreground mt-2">保存中...</p>}
            </div>
            
            <BookForm
              initialData={initialDataForForm}
              onSubmit={handleSave}
              onCancel={handleCancel}
              submitLabel={saving ? '保存中...' : '保存更改'}
            />
          </div>
        ) : (
          /* View Mode */
          <div>
            {/* Title and Author/Publisher */}
            <div className="mb-8">
              <h1 className="text-4xl mb-3">{book.title}</h1>
              {(() => {
                const parts = [book.author, book.publisher].filter(Boolean);
                if (parts.length === 0) return null;
                return (
                  <p className="text-xl text-muted-foreground">
                    {parts.join(' / ')}
                  </p>
                );
              })()}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-border">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <span className="text-primary">{book.clc_code}</span>
                {
                  CLC_CATEGORIES.find(c => c.code === book.clc_code)?.name && (
                    <span className="text-sm text-muted-foreground">
                      {CLC_CATEGORIES.find(c => c.code === book.clc_code)?.name}
                    </span>
                  )
                }
              </div>
              {
                book.status && (book.status in BOOK_STATUS_LABELS) && (
                  <span className={`inline-block px-3 py-1 rounded-full ${BOOK_STATUS_LABELS[book.status as BookStatus].color}`}>
                    {BOOK_STATUS_LABELS[book.status as BookStatus].zh}
                  </span>
                )
              }
            </div>

            {/* Tags */}
            {tagsArray.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg mb-3">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {tagsArray.map(tag => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            {book.summary && (
              <div className="mb-8">
                <h3 className="text-lg mb-3">笔记</h3>
                <div className="bg-muted rounded-lg p-6">
                  <p className="text-muted-foreground whitespace-pre-wrap">{book.summary}</p>
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="pt-8 border-t border-border">
              <div className="text-sm text-muted-foreground">
                {createdAt && (
                  <>
                    添加于 {new Date(createdAt).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        bookTitle={book.title}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
