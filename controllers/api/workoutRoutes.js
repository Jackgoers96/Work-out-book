const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  db.Workout.create({})
    .then((data) => res.json(data))
    .catch((err) => {
      console.log("Error:", err);
      res.json(err);
    });
});

router.put("/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((data) => res.json(data))
    .catch((err) => {
      console.log("Error:", err);
      res.json(err);
    });
});

module.exports = router;