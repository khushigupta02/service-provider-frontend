export const getUserRole = async () => {
    try {
        // Make an HTTP request to the server to fetch user role
        const response = await fetch('http://localhost:8080/viewAllRole', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        const data = await response.json();
        return data.role; // Assuming the server returns the user's role in the response
    } catch (error) {
        console.error('Error fetching user role:', error);
        throw new Error('Failed to fetch user role');
    }
};