import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  bookTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  bookTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 px-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-8">
        <h2 className="text-2xl mb-4">删除此书？</h2>
        
        <div className="mb-4">
          <p className="text-lg mb-2">《{bookTitle}》</p>
          <p className="text-sm text-muted-foreground">此操作无法撤销。</p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 border border-destructive/30 transition-colors"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
}
