import type { ReactNode } from 'react';
import { useAuthStore } from '../stores/authStore';
import { AlertTriangleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { user } = useAuthStore();

  // Kiểm tra xem user đã đăng nhập chưa
  if (!user) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <Alert className="max-w-md w-full border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
            <AlertTriangleIcon />
            <AlertTitle>Vui lòng đăng nhập để tiếp tục</AlertTitle>
            <AlertDescription>
              Bạn phải đăng nhập thì mới có thể truy cập trang này
            </AlertDescription>
          </Alert>
        </div>
      )
    }
  }

 
  return <>{children}</>;
}
