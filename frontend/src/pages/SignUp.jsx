import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!values.name || !values.email || !values.password) {
      setErrorMsg('All fields are required');
      return;
    }
    if (!validateEmail(values.email)) {
      setErrorMsg('Invalid email format');
      return;
    }
    if (values.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setErrorMsg(data.message || 'Signup failed');
      } else {
        alert('Signup successful');
        navigate('/login'); // Redirect to the home page
      }
    } catch (error) {
      setErrorMsg('Error signing up: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 md:p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
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
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
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
            {isSubmitting ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
