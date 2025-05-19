function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("loginTab").classList.remove("active");
    document.getElementById("registerTab").classList.add("active");
}

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("registerTab").classList.remove("active");
}

// Swap navbar to show user icon
function showUserIcon() {
    const authLinks = document.getElementById("authLinks");
    const userIcon = document.getElementById("userIcon");

    if(authLinks && userIcon){
        authLinks.classList.add("d-none");
        userIcon.classList.remove("d-none");
    }
}

// Handle Login Form
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Logged in successfully!");

    // Save login info
    localStorage.setItem('loggedIn', 'true');

    // Redirect
    window.location.href = "index.html";
});
function showLogout () {
    localStorage.removeItem('loggedIn');
    window.location.href = "index.html"; // or your login page

}
// Handle Register Form
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
    } else {
        alert("Registered successfully!");

        // Save login info
        localStorage.setItem('loggedIn', 'true');

        // Redirect
        window.location.href = "index.html";
    }
});
// When page loads, check if user is already logged in
window.onload = function() {
    if(localStorage.getItem('loggedIn') === 'true') {
        showUserIcon();
    }
}

