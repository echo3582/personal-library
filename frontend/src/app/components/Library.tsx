import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { CLC_CATEGORIES, BOOK_STATUS_LABELS, BookStatus } from '../data/books';
import { X, Edit2 } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';

export function Library() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const { books, loading, error } = useBooks();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [selectedStatuses, setSelectedStatuses] = useState<BookStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParam || '');

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(searchParam || '');
  }, [searchParam]);

  // 把后端返回的 tags 字符串转成数组，便于筛选和展示
  const tagsArray = (book: { tags?: string | null }) =>
    book.tags ? book.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

  // Filter books（数据源改为接口返回的 books）
  let filteredBooks = [...books];

  if (selectedCategory) {
    filteredBooks = filteredBooks.filter((book) => book.clc_code === selectedCategory);
  }

  if (selectedStatuses.length > 0) {
    filteredBooks = filteredBooks.filter(
      (book) => book.status != null && selectedStatuses.includes(book.status as BookStatus)
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => {
      const tags = tagsArray(book);
      return (
        book.title.toLowerCase().includes(query) ||
        (book.author?.toLowerCase().includes(query) ?? false) ||
        tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }

  const toggleStatus = (status: BookStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleCategoryClick = (code: string) => {
    setSelectedCategory(code);
    setSearchParams({ category: code });
  };

  const allTags = Array.from(
    new Set(books.flatMap((book) => tagsArray(book)))
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-sidebar-border bg-sidebar flex-shrink-0">
        <div className="sticky top-0">
          <Link to="/" className="flex items-center gap-2 p-6 border-b border-sidebar-border">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground">📚</span>
            </div>
            <span className="text-xl tracking-wide">My Library</span>
          </Link>
          
          <div className="p-4">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchParams({});
              }}
              className={`w-full text-left px-3 py-2 rounded-lg mb-2 transition-colors ${
                !selectedCategory 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              所有书籍
            </button>
            
            <div className="mt-4 mb-2 px-3 text-xs uppercase tracking-wider text-muted-foreground">
              分类
            </div>
            
            <div className="space-y-1 max-h-[calc(100vh-240px)] overflow-y-auto">
              {CLC_CATEGORIES.map(category => {
                const count = books.filter(book => book.clc_code === category.code).length;
                if (count === 0) return null;
                
                return (
                  <button
                    key={category.code}
                    onClick={() => handleCategoryClick(category.code)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.code
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'hover:bg-sidebar-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-6 text-primary">{category.code}</span>
                        <span className="text-sm truncate">{category.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{count}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl mb-2">
              {selectedCategory
                ? CLC_CATEGORIES.find(c => c.code === selectedCategory)?.name
                : '所有书籍'}
            </h1>
            <p className="text-muted-foreground">
              {loading ? '加载中...' : `共 ${filteredBooks.length} 本书`}
            </p>
          </div>

          {error && (
            <p className="text-red-500 mb-4">加载书籍失败：{error.message}</p>
          )}

          {/* Filter Bar */}
          <div className="mb-8 space-y-4">
            {/* Status Filters */}
            <div>
              <div className="text-sm text-muted-foreground mb-2">状态筛选</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(BOOK_STATUS_LABELS).map(([status, { zh }]) => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status as BookStatus)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      selectedStatuses.includes(status as BookStatus)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {zh}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {(selectedStatuses.length > 0 || searchQuery) && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">已选:</span>
                {selectedStatuses.map(status => (
                  <span
                    key={status}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"
                  >
                    {BOOK_STATUS_LABELS[status].zh}
                    <button
                      onClick={() => toggleStatus(status)}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                    搜索: {searchQuery}
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        searchParams.delete('search');
                        setSearchParams(searchParams);
                      }}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Book List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-16 text-muted-foreground">加载中...</div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p>暂无符合条件的书籍</p>
                <Link to="/add-book" className="text-primary hover:underline mt-2 inline-block">
                  添加第一本书
                </Link>
              </div>
            ) : (
              filteredBooks.map(book => (
                <div
                  key={book.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Link to={`/book/${book.id}`} className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl group-hover:text-primary transition-colors">{book.title}</h3>
                        <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                          {book.clc_code}
                        </span>
                        {
                          book.status && (
                            <span className={`inline-block px-2 py-1 text-xs rounded ${BOOK_STATUS_LABELS[book.status].color}`}>
                              {BOOK_STATUS_LABELS[book.status].zh}
                            </span>
                          )
                        }
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{book.author}</p>
                      
                      {book.tags && book.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {book.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {book.note && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{book.note}</p>
                      )}
                    </Link>
                    
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-sm text-muted-foreground">
                        {new Date(book.created_at).toLocaleDateString('zh-CN')}
                      </div>
                      <Link
                        to={`/book/${book.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/book/${book.id}?edit=true`;
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                      >
                        <Edit2 className="w-3 h-3" />
                        编辑
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
