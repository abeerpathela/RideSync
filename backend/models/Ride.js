const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pickup: {
    type: String,
    required: true
  },
  dropoff: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
    default: 'pending'
  },
  vehicleType: {
    type: String,
    enum: ['bike', 'auto', 'car', 'suv'],
    default: 'car'
  },
  date: {
    type: Date,
    default: Date.now
  },
  pickupCoordinates: {
    lat: Number,
    lng: Number
  },
  dropoffCoordinates: {
    lat: Number,
    lng: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ride', rideSchema);
