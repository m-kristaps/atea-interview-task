import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import type { Permission } from './authService';
import { useAuth } from './useAuth';

interface ProtectedRouteProps {
    children: ReactNode;
    permission?: Permission;
}

export function ProtectedRoute({ children, permission }: ProtectedRouteProps) {
    const { user } = useAuth();
    const location = useLocation();

    if (user === null) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (permission && !user.permissions.includes(permission)) {
        
        return (
            <section className="message-box" role="alert">
                <h2>No access</h2>
                <p>Your account is not allowed to view subscriptions. Please contact your administrator.</p>
            </section>
        );
    }

    return children;
}
