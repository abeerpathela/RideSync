import { useEffect, useState } from 'react';
import { rideAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const res = await rideAPI.getDashboardStats();
      setStats(res.data);
    } catch (error) {
      toast.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome, {user?.name}!
        </h1>

        {user?.role === 'admin' && stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalRides}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Rides</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completedRides}</div>
                <div className="text-gray-600 dark:text-gray-400">Completed Rides</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pendingRides}</div>
                <div className="text-gray-600 dark:text-gray-400">Pending Rides</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalUsers}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Users</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Rides</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">User</th>
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Pickup</th>
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Dropoff</th>
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Fare</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentRides.map((ride) => (
                      <tr key={ride._id} className="border-b dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{ride.user?.name}</td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{ride.pickup}</td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{ride.dropoff}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            ride.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            ride.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {ride.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">${ride.fare}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {user?.role === 'user' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Book a Ride</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Get a ride to your destination quickly and safely</p>
              <a href="/book-ride" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
                Book Now
              </a>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Rides</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">View your ride history and current bookings</p>
              <a href="/my-rides" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
                View Rides
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
