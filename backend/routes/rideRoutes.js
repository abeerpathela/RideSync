const express = require('express');
const {
  createRide,
  getMyRides,
  getAllRides,
  updateRideStatus,
  deleteRide,
  getRideById,
  getDashboardStats
} = require('../controllers/rideController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, createRide).get(protect, authorize('admin'), getAllRides);
router.route('/myrides').get(protect, getMyRides);
router.route('/dashboard').get(protect, authorize('admin'), getDashboardStats);
router.route('/:id').get(protect, getRideById).put(protect, authorize('admin', 'driver'), updateRideStatus).delete(protect, authorize('admin'), deleteRide);

module.exports = router;
