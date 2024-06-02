// src/authService.ts
export const isAuthenticated = (): boolean => {
    // Replace with real authentication logic
    return !!localStorage.getItem('userToken');
};
