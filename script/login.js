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
// Handle Login Form
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const foundUser = users.find(
    (user) => user.name === name && user.password === password
  );

  if (foundUser) {
    Swal.fire({
      icon: "success",
      title: "Logged in successfully!",
      timer: 1500,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
    }).then(() => {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", foundUser.name);
      window.location.href = "index.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Credentials",
      text: "Name or password is incorrect.",
    });
  }
});



// Handle Register Form
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Passwords do not match!",
    });
    return;
  }

  // Get existing users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    Swal.fire({
      icon: "error",
      title: "Account already exists!",
      text: "Please use another email or login.",
    });
    return;
  }

  // Add new user
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  Swal.fire({
    icon: "success",
    title: "Registered successfully!",
    timer: 1500,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
  }).then(() => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", name);
    window.location.href = "index.html";
  });
});
