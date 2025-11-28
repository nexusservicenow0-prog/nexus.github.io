document.getElementById('loginForm').addEventListener('submit', handleLogin);

async function handleLogin(event) {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();

    const accountIdInput = document.getElementById('accountId').value;
    const passwordInput = document.getElementById('password').value;

    try {
        // 1. Get users.json data
        const response = await fetch('users.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();

        // 2. Search for an account ID match
        // The find() method returns the value of the first element in the provided array 
        // that satisfies the provided testing function.
        const foundUser = users.find(user => user.account_id === accountIdInput);

        // IF Found: Continue. Else: alert "account not found. kindly create an account."
        if (!foundUser) {
            alert('Account not found. kindly create an account.');
            return; // Stop execution
        }

        // 3. Check if the password is correct
        // Note: In a real application, passwords should NEVER be stored as plain text
        // and comparison would involve hashing (e.g., bcrypt).
        if (foundUser.password === passwordInput) {
            // IF Correct: Continue.
            
            // 4. Create a local storage session named "TID". Store in it the user's accountId.
            localStorage.setItem('TID', foundUser.account_id);
            
            // Optional: Redirect or confirm login success
            alert(`Login successful! Welcome, ${foundUser.full_name}. Session (TID) created.`);
            
            // You might redirect the user here:
             window.location.href = 'dashboard.html';
        } else {
            // Else: alert password incorrect.
            alert('Password incorrect.');
        }

    } catch (error) {
        console.error('Login failed:', error);
        alert('An error occurred during login. Check console for details.');
    }
}