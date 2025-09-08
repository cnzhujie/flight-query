import React, { createContext, useContext, useRef, useState } from 'react';
import { Toast, ToastProps } from '../components/Toast/Toast';

export interface ToastItem extends Omit<ToastProps, 'onClose' | 'show'> {
  id: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastProps['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastProps['type'] = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastItem = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50">
        {toasts.map(toast => (
          <div key={toast.id} className="mb-2">
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              show={true}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};