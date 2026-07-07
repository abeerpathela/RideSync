import { useEffect, useState } from 'react';
import { rideAPI } from '../services/api';
import { toast } from 'react-toastify';

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({ search: '', status: '' });

  useEffect(() => {
    fetchRides();
  }, [pagination.page, filters]);

  const fetchRides = async () => {
    try {
      setLoading(true);
      const res = await rideAPI.getMyRides({
        page: pagination.page,
        limit: 10,
        ...filters
      });
      setRides(res.data.rides);
      setPagination({
        page: res.data.page,
        pages: res.data.pages,
        total: res.data.total
      });
    } catch (error) {
      toast.error('Failed to load rides');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPagination({ ...pagination, page: 1 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Rides</h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Search by pickup or dropoff"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {rides.map((ride) => (
            <div key={ride._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl">
                      {ride.vehicleType === 'bike' && '🚲'}
                      {ride.vehicleType === 'auto' && '🛺'}
                      {ride.vehicleType === 'car' && '🚗'}
                      {ride.vehicleType === 'suv' && '🚙'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      ride.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      ride.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {ride.status}
                    </span>
                  </div>
                  <div className="text-gray-900 dark:text-white mb-1">
                    <span className="font-semibold">From:</span> {ride.pickup}
                  </div>
                  <div className="text-gray-900 dark:text-white mb-1">
                    <span className="font-semibold">To:</span> {ride.dropoff}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    Distance: {ride.distance} km | Fare: ${ride.fare}
                  </div>
                  {ride.driver && (
                    <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                      Driver: {ride.driver.name}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {new Date(ride.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPagination({ ...pagination, page: i + 1 })}
                className={`px-4 py-2 rounded-lg ${
                  pagination.page === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {rides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No rides found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRides;
