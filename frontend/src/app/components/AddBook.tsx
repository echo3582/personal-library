import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { CLC_CATEGORIES, BookStatus, BOOK_STATUS_LABELS } from '../data/books';
import { X, ArrowLeft } from 'lucide-react';

const COMMON_CATEGORIES = ['I', 'B', 'K', 'TP', 'F', 'H', 'J', 'N'];

export function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    status: 'unread' as BookStatus,
    tags: [] as string[],
    note: '',
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent, addAnother = false) => {
    e.preventDefault();
    
    if (!formData.title) {
      alert('请输入书名');
      return;
    }

    // In a real app, this would save to a database
    console.log('Saving book:', formData);
    
    if (addAnother) {
      // Reset form but keep category
      setFormData({
        title: '',
        author: '',
        category: formData.category,
        status: 'unread',
        tags: [],
        note: '',
      });
      setTagInput('');
      alert('书籍已添加！继续添加下一本。');
    } else {
      alert('书籍已添加！');
      navigate('/library');
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
        </div>

        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
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
            <label className="block mb-2">中图分类</label>
            
            {/* Common categories as quick buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              {COMMON_CATEGORIES.map(code => {
                const category = CLC_CATEGORIES.find(c => c.code === code);
                if (!category) return null;
                
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: code }))}
                    className={`px-3 py-2 rounded-lg border transition-all ${
                      formData.category === code
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
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">选择分类...</option>
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
              {Object.entries(BOOK_STATUS_LABELS).map(([status, { zh, color }]) => (
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
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              保存
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              保存并继续添加
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
