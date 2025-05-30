// Show Register Form
function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.add("active");
}

// Show Login Form
function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
}

// Show User Icon when logged in
function showUserIcon(username) {
  const authLinks = document.getElementById("authLinks");
  const userIcon = document.getElementById("userIcon");
  const userName = document.getElementById("userName");

  authLinks.classList.add("d-none");
  userIcon.classList.remove("d-none");
  userName.textContent = username;
}

// Handle Login Form
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Validate login
  if (email && password) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logged in successfully!",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    }).then(() => {
      // Save login info
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", email);
      window.location.href = "index.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Credentials",
      text: "Please enter both email and password.",
    });
  }
});

// Handle Register Form
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Passwords do not match!',
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registered successfully!',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      }).then(() => {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", name); 
        // Redirect to home page
        window.location.href = "index.html";
      });
    }
  });
