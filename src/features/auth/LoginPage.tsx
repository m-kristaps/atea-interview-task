import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, type Location } from 'react-router';
import { InvalidCredentialsError } from './authService';
import { useAuth } from './useAuth';
import styles from './LoginPage.module.scss';

export function LoginPage() {
    const { user, login } = useAuth();
    const location = useLocation();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const from = (location.state as { from?: Location } | null)?.from;
    const redirectTo = from ? from.pathname + from.search : '/';

    if (user !== null) {
        return <Navigate to={redirectTo} replace />;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        setError(null);
        setIsSubmitting(true);

        try {
            await login(String(form.get('username')), String(form.get('password')));
        } catch (err) {
            if (err instanceof InvalidCredentialsError) {
                setError('Wrong username or password.');
            } else {
                setError('Something went wrong, please try again.');
            }
            setIsSubmitting(false);
        }
    }

    return (
        <main className={styles.page}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h1>Subscription Dashboard</h1>
                <p className={styles.subtitle}>Sign in to continue</p>

                <label htmlFor="username">Username</label>
                <input id="username" name="username" autoComplete="username" required autoFocus />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required />

                {error && (
                    <p className={styles.error} role="alert">
                        {error}
                    </p>
                )}

                <button type="submit" className="button button--primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in…' : 'Sign in'}
                </button>
            </form>
        </main>
    );
}
