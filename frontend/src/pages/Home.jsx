import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to RideSync
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Your reliable cab booking service
          </p>
          {user ? (
            <Link
              to="/book-ride"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Book a Ride Now
            </Link>
          ) : (
            <Link
              to="/register"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          )}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fast & Reliable</h3>
            <p className="text-gray-600 dark:text-gray-300">Book a ride in seconds and reach your destination on time</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Affordable Fares</h3>
            <p className="text-gray-600 dark:text-gray-300">Transparent pricing with no hidden charges</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Safe & Secure</h3>
            <p className="text-gray-600 dark:text-gray-300">Verified drivers and secure payment options</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
