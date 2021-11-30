const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((getWorkout) => {
      res.json(getWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/', async (req, res) => {
    try{
        const newWorkout = await db.Workout.create({})
        res.json(newWorkout);
    }
    catch (err){
        console.log(err);
    }
});


router.put('/:id', async ({ body, params }, res) => {
    try{
       await db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body }})
       .then((newWorkout) => {
        res.json(newWorkout);
    })
    }
    catch (err){
        console.log(err);
    }
});


router.get("/range", async (req, res) => {
  try {
    const allWorkouts = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ])
      .limit(7)
      .then((allWorkouts) => {
        res.json(allWorkouts);
      });
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;