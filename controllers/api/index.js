const router = require('express').Router();
const workoutsRoutes = require('./workoutsRoutes');

router.use('/workouts', workoutsRoutes);

module.exports = router;