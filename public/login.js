const username = document.getElementById('username');
const password = document.getElementById('password');
const toast = document.getElementById('status');

const login = async () => {
  if (!username.value || !password.value) {
    console.error('Username and password are required');
    return;
  }

  const user = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
      toast.innerHTML = `Welcome ${data.user.name}`;
    } else {
      toast.innerHTML = 'Login failed. Please check your credentials.';
      console.error('Login failed:');
    }
  } catch (error) {
    toast.innerHTML = 'http error';
    console.error('Error:', error);
  }
};

const sendButton = document.getElementById('send');
sendButton.addEventListener('click', login);

const register = async () => {
  if (!username.value || !password.value) {
    console.error('Username and password are required');
    return;
  }

  const user = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Register successful:', data);
    } else {
      console.error('Register failed:');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const registerButton = document.getElementById('register');
registerButton.addEventListener('click', register);
