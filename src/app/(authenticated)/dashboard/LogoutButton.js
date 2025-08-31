'use client';

const LogoutButton = () => {
    const handleLogout = async (event) => {
        event.preventDefault();
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = '/login';
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;