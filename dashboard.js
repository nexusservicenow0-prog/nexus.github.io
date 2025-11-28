document.addEventListener('DOMContentLoaded', initDashboard);

async function initDashboard() {
    // 1. Search for local storage session named "TID"
    const accountId = localStorage.getItem('TID');
    const greetingElement = document.getElementById('greeting');
    const balanceElement = document.getElementById('currentBalance');
    
    // Check if the user is logged in (TID exists)
    if (!accountId) {
        alert('Session expired or not logged in. Redirecting to login.');
        // Redirect to the login page if no session is found
        window.location.href = 'index.html'; 
        return;
    }

    try {
        // 2. Get Users.json data
        const response = await fetch('users.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();

        // 3. Search for entry in Users.json that has the account id
        const currentUser = users.find(user => user.account_id === accountId);

        if (currentUser) {
            // 4. Display the balance in that entry
            const formattedBalance = new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
                minimumFractionDigits: 0
            }).format(currentUser.balance);
            
            balanceElement.textContent = formattedBalance;
            greetingElement.textContent = `Hello, ${currentUser.full_name.split(' ')[0]} (ID: ${accountId})`;

        } else {
            // User ID exists in local storage but not in JSON file (data mismatch)
            balanceElement.textContent = 'User data not found.';
            localStorage.removeItem('TID'); // Clear invalid session
        }

    } catch (error) {
        console.error('Failed to load dashboard data:', error);
        balanceElement.textContent = 'Error loading data.';
        alert('Could not connect to the user data source.');
    }
    
    // Set up navigation for the main action buttons
    document.getElementById('depositBtn').addEventListener('click', () => {
        // Redirect to deposit.html
        window.location.href = 'deposit.html';
    });
    
    document.getElementById('withdrawBtn').addEventListener('click', () => {
        // Redirect to withdraw.html
        window.location.href = 'withdraw.html';
    });
}