// utils/auth.js

export const login = async (username, password) => {
  try {
    const response = await fetch('http://192.168.1.4:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('There was a problem with the login request:', error);
    throw error;
  }
};
