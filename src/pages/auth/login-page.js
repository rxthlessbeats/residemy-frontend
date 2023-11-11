// pages/login.js
import React from 'react';


const Login = () => {
  const handleLogin = () => {
    // Redirect to LINE's OAuth 2.0 login page
    window.location.href = `/auth/line-login`; // This will be your Next.js API route
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with LINE{process.env.BASE_URL}</button>
    </div>
  );
};

export default Login;
