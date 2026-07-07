const Ride = require('../models/Ride');
const User = require('../models/User');

const createRide = async (req, res) => {
  const { pickup, dropoff, distance, fare, vehicleType, pickupCoordinates, dropoffCoordinates } = req.body;

  const ride = await Ride.create({
    user: req.user._id,
    pickup,
    dropoff,
    distance,
    fare,
    vehicleType,
    pickupCoordinates,
    dropoffCoordinates
  });

  if (ride) {
    res.status(201).json(ride);
  } else {
    res.status(400);
    throw new Error('Invalid ride data');
  }
};

const getMyRides = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || '';
  const status = req.query.status || '';

  let query = { user: req.user._id };

  if (search) {
    query.$or = [
      { pickup: { $regex: search, $options: 'i' } },
      { dropoff: { $regex: search, $options: 'i' } }
    ];
  }

  if (status) {
    query.status = status;
  }

  const rides = await Ride.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('driver', 'name');

  const total = await Ride.countDocuments(query);

  res.json({
    rides,
    page,
    pages: Math.ceil(total / limit),
    total
  });
};

const getAllRides = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || '';
  const status = req.query.status || '';

  let query = {};

  if (search) {
    query.$or = [
      { pickup: { $regex: search, $options: 'i' } },
      { dropoff: { $regex: search, $options: 'i' } }
    ];
  }

  if (status) {
    query.status = status;
  }

  const rides = await Ride.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'name email')
    .populate('driver', 'name');

  const total = await Ride.countDocuments(query);

  res.json({
    rides,
    page,
    pages: Math.ceil(total / limit),
    total
  });
};

const updateRideStatus = async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  if (ride) {
    ride.status = req.body.status || ride.status;
    ride.driver = req.body.driver || ride.driver;

    const updatedRide = await ride.save();
    res.json(updatedRide);
  } else {
    res.status(404);
    throw new Error('Ride not found');
  }
};

const deleteRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (ride) {
    await ride.deleteOne();
    res.json({ message: 'Ride removed' });
  } else {
    res.status(404);
    throw new Error('Ride not found');
  }
};

const getRideById = async (req, res) => {
  const ride = await Ride.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('driver', 'name phone');

  if (ride) {
    res.json(ride);
  } else {
    res.status(404);
    throw new Error('Ride not found');
  }
};

const getDashboardStats = async (req, res) => {
  const totalRides = await Ride.countDocuments();
  const completedRides = await Ride.countDocuments({ status: 'completed' });
  const pendingRides = await Ride.countDocuments({ status: 'pending' });
  const totalUsers = await User.countDocuments();

  const recentRides = await Ride.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name')
    .populate('driver', 'name');

  res.json({
    totalRides,
    completedRides,
    pendingRides,
    totalUsers,
    recentRides
  });
};

module.exports = {
  createRide,
  getMyRides,
  getAllRides,
  updateRideStatus,
  deleteRide,
  getRideById,
  getDashboardStats
};
