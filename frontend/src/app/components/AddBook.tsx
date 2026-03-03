import { useNavigate, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { BookForm, BookFormData } from './BookForm';

export function AddBook() {
  const navigate = useNavigate();

  const handleSubmit = (data: BookFormData) => {
    // In a real app, this would save to a database
    console.log('Saving book:', data);
    alert('书籍已添加！');
    navigate('/library');
  };

  const handleSubmitAndAddAnother = (data: BookFormData) => {
    // In a real app, this would save to a database
    console.log('Saving book:', data);
    alert('书籍已添加！继续添加下一本。');
    // The form will reset itself via key change or internal state
    window.location.reload(); // Simple approach for demo
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

        <BookForm
          onSubmit={handleSubmit}
          submitLabel="保存"
          showSaveAndAddAnother={true}
          onSubmitAndAddAnother={handleSubmitAndAddAnother}
        />
      </main>
    </div>
  );
}