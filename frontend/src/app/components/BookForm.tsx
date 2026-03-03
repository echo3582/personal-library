import { useState } from 'react';
import { CLC_CATEGORIES, BookStatus, BOOK_STATUS_LABELS, Book } from '../data/books';
import { X } from 'lucide-react';

const COMMON_CATEGORIES = ['I', 'TP', 'K', 'B', 'G', 'F', 'J', 'H'];

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: BookFormData) => void;
  onCancel?: () => void;
  submitLabel?: string;
  showSaveAndAddAnother?: boolean;
  onSubmitAndAddAnother?: (data: BookFormData) => void;
}

export interface BookFormData {
  title: string;
  author: string;
  clc_code: string;
  status: BookStatus;
  tags: string[];
  summary: string;
}

export function BookForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = '保存',
  showSaveAndAddAnother = false,
  onSubmitAndAddAnother,
}: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: initialData?.title || '',
    author: initialData?.author || '',
    clc_code: initialData?.clc_code || '',
    status: initialData?.status || 'unread',
    tags: initialData?.tags || [],
    summary: initialData?.summary || '',
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      alert('请输入书名');
      return;
    }

    if (!formData.clc_code) {
      alert('请选择分类');
      return;
    }

    onSubmit(formData);
  };

  const handleSubmitAndAddAnother = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      alert('请输入书名');
      return;
    }

    if (!formData.clc_code) {
      alert('请选择分类');
      return;
    }

    if (onSubmitAndAddAnother) {
      onSubmitAndAddAnother(formData);
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block mb-2">
          书名 <span className="text-destructive">*</span>
        </label>
        <input
          id="title"
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="输入书名"
        />
      </div>

      {/* Author */}
      <div>
        <label htmlFor="author" className="block mb-2">
          作者
        </label>
        <input
          id="author"
          type="text"
          value={formData.author}
          onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
          className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="输入作者名"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2">
          中图分类 <span className="text-destructive">*</span>
        </label>
        
        {/* Common categories as quick buttons */}
        <div className="flex flex-wrap gap-2 mb-3">
          {COMMON_CATEGORIES.map(code => {
            const category = CLC_CATEGORIES.find(c => c.code === code);
            if (!category) return null;
            
            return (
              <button
                key={code}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, clc_code: code }))}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  formData.clc_code === code
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <span className="mr-2">{code}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Full category select */}
        <select
          value={formData.clc_code}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">更多分类...</option>
          {CLC_CATEGORIES.map(category => (
            <option key={category.code} value={category.code}>
              {category.code} - {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-2">阅读状态</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(BOOK_STATUS_LABELS).map(([status, { zh }]) => (
            <button
              key={status}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, status: status as BookStatus }))}
              className={`px-4 py-2 rounded-lg border transition-all ${
                formData.status === status
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border hover:border-primary/50'
              }`}
            >
              {zh}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block mb-2">
          标签
        </label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="输入标签后按回车"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              添加
            </button>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Note */}
      <div>
        <label htmlFor="note" className="block mb-2">
          笔记
        </label>
        <textarea
          id="note"
          value={formData.note}
          onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="记录您对这本书的想法或备注..."
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            取消
          </button>
        )}
        
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          {submitLabel}
        </button>
        
        {showSaveAndAddAnother && onSubmitAndAddAnother && (
          <button
            type="button"
            onClick={handleSubmitAndAddAnother}
            className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            保存并继续添加
          </button>
        )}
      </div>
    </form>
  );
}
