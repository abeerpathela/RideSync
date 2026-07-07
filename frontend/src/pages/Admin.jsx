import { useEffect, useState } from 'react';
import { authAPI, rideAPI } from '../services/api';
import { toast } from 'react-toastify';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('rides');

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else {
      fetchRides();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await authAPI.getAllUsers();
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchRides = async () => {
    try {
      setLoading(true);
      const res = await rideAPI.getAllRides({ limit: 20 });
      setRides(res.data.rides);
    } catch (error) {
      toast.error('Failed to load rides');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await authAPI.deleteUser(id);
        toast.success('User deleted');
        fetchUsers();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const updateRideStatus = async (id, status, driverId = null) => {
    try {
      await rideAPI.updateRideStatus(id, { status, driver: driverId });
      toast.success('Ride updated');
      fetchRides();
    } catch (error) {
      toast.error('Failed to update ride');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
            <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Panel</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('rides')}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === 'rides'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            }`}
          >
            Rides
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            }`}
          >
            Users
          </button>
        </div>

        {activeTab === 'rides' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">User</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Pickup</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Dropoff</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Fare</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {rides.map((ride) => (
                    <tr key={ride._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{ride.user?.name}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{ride.pickup}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{ride.dropoff}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          ride.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          ride.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {ride.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">${ride.fare}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {ride.status === 'pending' && (
                            <button
                              onClick={() => updateRideStatus(ride._id, 'accepted')}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Accept
                            </button>
                          )}
                          {ride.status === 'accepted' && (
                            <button
                              onClick={() => updateRideStatus(ride._id, 'ongoing')}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Start
                            </button>
                          )}
                          {ride.status === 'ongoing' && (
                            <button
                              onClick={() => updateRideStatus(ride._id, 'completed')}
                              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                              Complete
                            </button>
                          )}
                          {ride.status !== 'completed' && ride.status !== 'cancelled' && (
                            <button
                              onClick={() => updateRideStatus(ride._id, 'cancelled')}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{user.name}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          user.role === 'driver' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
