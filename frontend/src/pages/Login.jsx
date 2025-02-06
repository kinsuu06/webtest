import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      setErrorMsg('All fields are required');
      return;
    }
    if (!validateEmail(values.email)) {
      setErrorMsg('Invalid email format');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      
      localStorage.setItem("token", data.token);
      if (!response.ok) {
        if (data.message === 'User not registered') {
          setErrorMsg('User not registered. Please sign up first.');
        } else {
          setErrorMsg(data.message || 'Login failed');
        }
      } else {
        onLogin(data.user.name); // Pass username to parent
        navigate('/'); // Redirect to home on successful login
      }
    } catch (error) {
      setErrorMsg('Error logging in: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 md:p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">
              {errorMsg}{' '}
              {errorMsg === 'User not registered. Please sign up first.' && (
                <Link to="/signup" className="text-blue-500 underline">
                  Sign Up
                </Link>
              )}
            </p>
          )}
          <button
            type="submit"
            className={`w-full px-4 py-3 md:py-4 text-white rounded-lg ${
              isSubmitting
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
