import { Outlet } from 'react-router';
import { useAuth } from '../features/auth/useAuth';
import styles from './AppLayout.module.scss';

export function AppLayout() {
    const { user, logout } = useAuth();

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <div className={styles.user}>
                    <span>
                        Signed in as <strong>{user?.displayName}</strong>
                    </span>
                    <button type="button" className="button" onClick={logout}>
                        Log out
                    </button>
                </div>
            </header>
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
}
