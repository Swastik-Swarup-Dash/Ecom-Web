// Toggle between Login and Sign Up forms
function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
  }
  
  function showSignUp() {
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
  }
  
  // Handle Login Form Submission
  document.getElementById('login-form-content').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    // Simple validation
    if (username === 'admin' && password === 'password') {
      alert('Login successful!');
      window.parent.closeLoginModal(); // Close the modal in the parent window
    } else {
      alert('Invalid username or password');
    }
  });
  
  // Handle Sign Up Form Submission
  document.getElementById('signup-form-content').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
  
    // Simple validation
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Save user data (for demonstration, we'll just log it)
    const user = {
      username,
      email,
      password,
    };
    console.log('User signed up:', user);
    alert('Sign up successful! Please log in.');
    showLogin(); // Switch back to the login form
  });