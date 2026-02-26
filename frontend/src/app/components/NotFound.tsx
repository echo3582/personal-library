import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">404</h1>
        <p className="text-muted-foreground mb-4">页面未找到</p>
        <Link to="/" className="text-primary hover:underline">
          返回首页
        </Link>
      </div>
    </div>
  );
}
