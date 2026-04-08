// Step 1: Create the login tracker
const createLoginTracker = (userInfo) => {
    let attemptCount = 0;

    const login = (passwordAttempt) => {
        attemptCount++;

        if (attemptCount > 3) {
            return "Account locked due to too many failed login attempts";
        }

        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        } else {
            return `Attempt ${attemptCount}: Login failed`;
        }
    };

    return login;
};

// Step 2: Create a user
const user = {
    username: "user1",
    password: "pn2026"
};

// Step 3: Create the login function
const login = createLoginTracker(user);

// Step 4: Make it interactive
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function askPassword() {
    readline.question('Enter password: ', (input) => {
        const result = login(input);
        console.log(result);

        // Stop if login successful or account locked
        if (result === "Login successful" || result.includes("locked")) {
            readline.close();
        } else {
            // Otherwise, ask again
            askPassword();
        }
    });
}

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};