document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/viewdata');
        
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();

        const userTableBody = document.getElementById('userTableBody');
        userTableBody.innerHTML = ''; // Clear previous data

        userData.forEach(user => {
            const row = document.createElement('tr');
            const usernameCell = document.createElement('td');
            const emailCell = document.createElement('td');

            usernameCell.textContent = user.username;
            emailCell.textContent = user.email;

            row.appendChild(usernameCell);
            row.appendChild(emailCell);

            userTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        // Optionally display an error message on the UI
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to fetch user data. Please try again later.';
        document.body.appendChild(errorMessage);
    }
});
