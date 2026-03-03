import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { BookForm, BookFormData } from './BookForm';
import { createBook, type CreateBookPayload } from '../services/books';

export function AddBook() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const normalizeOptional = (value: unknown): string | undefined => {
    if (value == null) return undefined;
    if (typeof value !== 'string') return undefined;
    const v = value.trim();
    return v.length === 0 ? undefined : v;
  };

  const buildPayload = (data: BookFormData): CreateBookPayload => {
    const tags = Array.isArray(data.tags)
      ? data.tags.map((t) => t.trim()).filter(Boolean).join(',')
      : undefined;

    // BookForm 当前 textarea 写的是 note，这里兼容映射到 summary
    const noteFromForm = (data as any).note as string | undefined;
    const summary = noteFromForm ?? data.summary;

    return {
      title: data.title.trim(),
      author: normalizeOptional(data.author),
      clc_code: normalizeOptional(data.clc_code),
      status: normalizeOptional(data.status),
      tags,
      summary: normalizeOptional(summary),
    };
  };

  const handleSubmit = async (data: BookFormData) => {
    try {
      if (saving) return;
      setSaving(true);

      const payload = buildPayload(data);
      await createBook(payload);

      alert('书籍已添加！');
      navigate('/library');
    } catch (e) {
      alert(`添加失败：${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitAndAddAnother = async (data: BookFormData) => {
    try {
      if (saving) return;
      setSaving(true);

      const payload = buildPayload(data);
      await createBook(payload);

      alert('书籍已添加！继续添加下一本。');
      // 简单处理：刷新页面清空表单
      window.location.reload();
    } catch (e) {
      alert(`添加失败：${(e as Error).message}`);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-8 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </Link>
        </div>
      </div>

      {/* Form */}
      <main className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">添加书籍</h1>
          <p className="text-muted-foreground">将新书添加到您的图书馆</p>
          {saving && <p className="text-sm text-muted-foreground mt-2">保存中...</p>}
        </div>

        <BookForm
          onSubmit={handleSubmit}
          submitLabel={saving ? '保存中...' : '保存'}
          showSaveAndAddAnother={true}
          onSubmitAndAddAnother={handleSubmitAndAddAnother}
        />
      </main>
    </div>
  );
}