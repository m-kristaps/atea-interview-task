import { InvalidCredentialsError, login } from './authService';

describe('login', () => {
    it('returns user without password', async () => {
        const user = await login('admin', 'admin123');
        expect(user).toEqual({
            username: 'admin',
            displayName: 'Anna Admin',
            permissions: ['subscriptions:read'],
        });
        expect(user).not.toHaveProperty('password');
    });


    it('rejects wrong password', async () => {
        await expect(login('admin', 'wrong')).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
    
});
