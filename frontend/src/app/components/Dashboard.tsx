import { Link, useNavigate } from 'react-router';
import { Search, Plus } from 'lucide-react';
import { CLC_CATEGORIES, mockBooks } from '../data/books';
import { useState } from 'react';

export function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Count books per category
  const categoryCount = CLC_CATEGORIES.map(category => ({
    ...category,
    count: mockBooks.filter(book => book.category.code === category.code).length,
  }));

  // Get recently added books (last 5)
  const recentBooks = [...mockBooks]
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/library?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground">📚</span>
            </div>
            <span className="text-xl tracking-wide">My Library</span>
          </Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索书籍..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </form>

          <button
            onClick={() => navigate('/add-book')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            添加书籍
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl mb-2">我的图书馆</h1>
          <p className="text-muted-foreground">按中国图书馆分类法管理您的藏书</p>
        </div>

        {/* CLC Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {categoryCount.map((category) => (
            <Link
              key={category.code}
              to={`/library?category=${category.code}`}
              className="group"
            >
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/30 transition-all">
                <div className="text-5xl text-primary mb-3 tracking-tight">
                  {category.code}
                </div>
                <h3 className="mb-1 text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{category.nameEn}</p>
                <div className="text-sm text-muted-foreground">
                  {category.count} {category.count === 1 ? '本' : '本书'}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recently Added Books */}
        {recentBooks.length > 0 && (
          <div>
            <h2 className="text-2xl mb-6">最近添加</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {recentBooks.map((book) => (
                <Link
                  key={book.id}
                  to={`/library?category=${book.category.code}`}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                      {book.category.code}
                    </span>
                  </div>
                  <h4 className="mb-1 line-clamp-2">{book.title}</h4>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
