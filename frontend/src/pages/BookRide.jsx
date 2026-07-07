import { useState } from 'react';
import { rideAPI } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BookRide = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    distance: '',
    fare: '',
    vehicleType: 'car'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await rideAPI.createRide({
        ...formData,
        distance: parseFloat(formData.distance),
        fare: parseFloat(formData.fare)
      });
      toast.success('Ride booked successfully!');
      navigate('/my-rides');
    } catch (error) {
      toast.error('Failed to book ride');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateFare = () => {
    const distance = parseFloat(formData.distance);
    if (distance) {
      let farePerKm;
      switch (formData.vehicleType) {
        case 'bike':
          farePerKm = 10;
          break;
        case 'auto':
          farePerKm = 15;
          break;
        case 'car':
          farePerKm = 20;
          break;
        case 'suv':
          farePerKm = 30;
          break;
        default:
          farePerKm = 20;
      }
      const fare = distance * farePerKm;
      setFormData({ ...formData, fare: fare.toFixed(2) });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Book a Ride</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter pickup location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dropoff Location
              </label>
              <input
                type="text"
                name="dropoff"
                value={formData.dropoff}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter dropoff location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Distance (km)
              </label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                onBlur={calculateFare}
                required
                step="0.1"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter distance"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vehicle Type
              </label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                onBlur={calculateFare}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="bike">Bike</option>
                <option value="auto">Auto</option>
                <option value="car">Car</option>
                <option value="suv">SUV</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estimated Fare ($)
              </label>
              <input
                type="number"
                name="fare"
                value={formData.fare}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Calculated fare"
                readOnly
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Book Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
