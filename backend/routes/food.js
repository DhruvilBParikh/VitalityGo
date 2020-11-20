const express = require("express");
const mongoose = require("../utils/mongoose-bootstrapper");
const router = express.Router();
const config = require("config");
const authUtils = require("../utils/jwt-token");
const Food = mongoose.model("Food");
const Nutrition = mongoose.model("Nutrition");
const Admin = mongoose.model("Admin");
const DayToDayGoal = mongoose.model("DayToDayGoal");

router.put("/:userId/addFoodRecord", authUtils, (req, res) => {
  const { foodName, mealType, calories, weight } = req.body;
  const { userId } = req.params;

  Food.findOneAndUpdate(
    { foodName: foodName },
    {
      $set: { foodName: foodName, defaultCalories: (calories * 100) / weight },
    },
    { new: true, upsert: true }
  )
    .exec()
    .then((response) => {
      Nutrition.create({
        user: userId,
        food: response._id,
        mealType: mealType,
        calories: calories,
        weight: weight,
        createdAt: new Date(),
      })
        .then((response2) => {
          Admin.create({
            user: response._id,
            activity: "Nutrition information added",
            auditedAt: new Date(),
          })
            .then((res) => {
              console.log("Nutrition information added");
            })
            .catch((err) => {
              res.status(401).send(err.message);
            });

          const resp = {
            msg: "Successfully updated",
            data: {},
          };

          res.status(200).send(JSON.stringify(resp));
        })
        .catch((err) => {
          res.status(401).send(err.message);
        });
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.get("/:userId/getNutritionRecords", authUtils, (req, res) => {
  const { userId } = req.params;

  Nutrition.find({ user: userId })
    .populate({ path: "food", select: ["foodName", "mealType"] })
    .exec()
    .then((response) => {
      const resp = {
        msg: "Successfully fetched",
        data: response,
      };
      res.status(200).send(JSON.stringify(resp));
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.get("/getFood", authUtils, (req, res) => {
  Food.find()
    .select("foodName defaultCalories -_id")
    .then((response) => {
      const resp = {
        msg: "Successfully fetched",
        data: response,
      };
      res.status(200).send(JSON.stringify(resp));
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.get("/:userId/getBestFoodPerformance", authUtils, (req, res) => {
  const { userId } = req.params;

  DayToDayGoal.find({ user: userId })
    .sort({ totalCalories: -1 })
    .limit(1)
    .then((response) => {
      const resp = {
        msg: "Successfully fetched",
        data: {
          totalCalories: response[0].totalCalories,
        },
      };
      res.status(200).send(JSON.stringify(resp));
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

module.exports = router;
