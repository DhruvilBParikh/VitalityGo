const express = require("express");
const mongoose = require("../utils/mongoose-bootstrapper");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = mongoose.model("User");
const Patient = mongoose.model("Patient");
const Doctor = mongoose.model("Doctor");
const Admin = mongoose.model("Admin");
const ECG = mongoose.model("ECG");
const Water = mongoose.model("Water");
const Goal = mongoose.model("Goal");
const DayToDayGoal = mongoose.model("DayToDayGoal");
const config = require("config");

router.post("/signup", async (req, res) => {
  let userData = req.body.userData;
  console.log(req.body);
  let user = new User(userData);
  user
    .save()
    .then((response) => {
      console.log("User Created");
      const token = jwt.sign({ userId: response._id }, config.app.jwtSecret);
      if (userData.type == "patient") {
        Patient.create({ userId: response._id, ...req.body.patientData })
          .then((response2) => {
            Goal.create({
              user: response._id,
              caloriesGoal: 2000,
              waterGoal: 8,
            })
              .then((response3) => {
                DayToDayGoal.create({
                  user: response._id,
                  totalCalories: 0,
                  totalWaterGlasses: 0,
                  caloriesGoalReached: Boolean(false),
                  waterGoalReached: Boolean(false),
                })
                  .then((response4) => {
                    ECG.create({ user: response._id, rate: 0 })
                      .then((response5) => {
                        Admin.create({
                          user: response._id,
                          activity: "Patient successfully signed up",
                          auditedAt: new Date(),
                        })
                          .then((result) => {
                            console.log(
                              "Patient Successfully signed up updated in admin"
                            );
                          })
                          .catch((err) => {
                            console.log("Admin Error");
                            res.status(401).send(`Admin Error:${err.message}`);
                          });

                        const resp = {
                          token: token,
                          msg: "Successfully signed up",
                          data: {
                            userData: response,
                            patientData: {
                              Data: response2,
                              caloriesGoal: response3.caloriesGoal
                                ? response3.caloriesGoal
                                : null,
                              waterGoal: response3.waterGoal
                                ? response3.waterGoal
                                : null,
                              currentECG: " ",
                              currentCaloriesGoal: response4
                                ? response4.currentCaloriesGoal
                                : null,
                              currentWaterGoal: response4
                                ? response4.currentWaterGoal
                                : null,
                              caloriesGoalReached: response4
                                ? response4.caloriesGoalReached
                                : null,
                              waterGoalReached: response4
                                ? response4.waterGoalReached
                                : null,
                            },
                          },
                        };
                        res.end(JSON.stringify(resp));
                      })
                      .catch((err) => {
                        console.log("ECG Error");
                        res.status(401).send(`ECG Error:${err.message}`);
                      });
                  })
                  .catch((err) => {
                    console.log("DaytoDayGoal Error");
                    res.status(401).send(`DaytoDayGoal Error:${err.message}`);
                  });
              })
              .catch((err) => {
                console.log("Goal Error");
                res.status(401).send(`Goal Error${err.message}`);
              });
          })
          .catch((err) => {
            console.log("Patient Error");
            res.status(401).send(`Patient Error${err.message}`);
          });
      } else {
        Doctor.create({ userId: response._id, ...req.body.doctorData })
          .then((response5) => {
            Admin.create({
              user: response._id,
              activity: "Doctor successfully signed up",
              auditedAt: new Date(),
            })
              .then((result) => {
                console.log("Doctor Successfully signed up updated in admin");
              })
              .catch((err) => {
                console.log("Admin Error");
                res.status(401).send(`Admin Error:${err.message}`);
              });

            const resp = {
              token: token,
              msg: "Successfully signed up",
              data: {
                userData: response,
                doctorData: response5,
              },
            };
            res.end(JSON.stringify(resp));
          })
          .catch((err) => {
            console.log("Doctor Error");
            res.status(401).send(`Doctor Error${err.message}`);
          });
      }
    })
    .catch((err) => {
      res.status(401).send(`User Error${err.message}`);
    });
});

router.post("/signupWithFB", async (req, res) => {
  const { email, firstName, lastName, type } = req.body;
  let user = new User({ email, firstName, lastName, type });
  user
    .save()
    .then((response) => {
      if (type == "Patient") {
        Patient.create({ userId: response._id }).then((res) => {
          console.log("Patient created");
        });
      } else {
        Doctor.create({ userId: response._id }).then((res) => {
          console.log("Doctor created");
        });
      }
      Admin.create({
        user: response._id,
        activity: "User Created",
        auditedAt: new Date(),
      }).then((res) => {
        console.log("User entry updated in admin");
      });
      const token = jwt.sign({ userId: response._id }, config.app.jwtSecret);
      res.status(200).send(token);
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.post("/signupWithGoogle", async (req, res) => {
  const { email, firstName, lastName, type } = req.body;
  let user = new User({ email, firstName, lastName, type });
  user
    .save()
    .then((response) => {
      if (type == "Patient") {
        Patient.create({ userId: response._id }).then((res) => {
          console.log("Patient created");
        });
      } else {
        Doctor.create({ userId: response._id }).then((res) => {
          console.log("Doctor created");
        });
      }
      Admin.create({
        user: response._id,
        activity: "User Created",
        auditedAt: new Date(),
      }).then((res) => {
        console.log("Admin: User created ");
      });
      const token = jwt.sign({ userId: response._id }, config.app.jwtSecret);
      res.status(200).send(token);
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email: email })
    .exec()
    .then((response) => {
      const token = jwt.sign({ userId: response._id }, config.app.jwtSecret);

      if (response.type == "patient") {
        Patient.findOne({ userId: response._id })
          .exec()
          .then((response2) => {
            Goal.findOne({ user: response._id })
              .exec()
              .then((response3) => {
                DayToDayGoal.findOne({ user: response._id })
                  .exec()
                  .then((response4) => {
                    ECG.findOne({ user: response._id })
                      .exec()
                      .then((response5) => {
                        Admin.create({
                          user: response._id,
                          activity: "Patient successfully signed in",
                          auditedAt: new Date(),
                        })
                          .then((result) => {
                            console.log(
                              "Patient Successfully signed in updated in admin"
                            );
                          })
                          .catch((err) => {
                            console.log("Admin Error");
                            res.status(401).send(`Admin Error:${err.message}`);
                          });

                        const resp = {
                          token: token,
                          msg: "Successfully signed up",
                          data: {
                            userData: response,
                            patientData: {
                              Data: response2,
                              caloriesGoal: response3.caloriesGoal
                                ? response3.caloriesGoal
                                : null,
                              waterGoal: response3.waterGoal
                                ? response3.waterGoal
                                : null,
                              currentECG: " ",
                              currentCaloriesGoal: response4
                                ? response4.currentCaloriesGoal
                                : null,
                              currentWaterGoal: response4
                                ? response4.currentWaterGoal
                                : null,
                              caloriesGoalReached: response4
                                ? response4.caloriesGoalReached
                                : null,
                              waterGoalReached: response4
                                ? response4.waterGoalReached
                                : null,
                            },
                          },
                        };
                        res.end(JSON.stringify(resp));
                      })
                      .catch((err) => {
                        console.log("ECG Error");
                        res.status(401).send(`ECG Error:${err.message}`);
                      });
                  })
                  .catch((err) => {
                    console.log("DaytoDayGoal Error");
                    res.status(401).send(`DaytoDayGoal Error:${err.message}`);
                  });
              })
              .catch((err) => {
                console.log("Goal Error");
                res.status(401).send(`Goal Error${err.message}`);
              });
          })
          .catch((err) => {
            console.log("Patient Error");
            res.status(401).send(`Patient Error${err.message}`);
          });
      } else {
        Doctor.findOne({ userId: response._id })
          .exec()
          .then((response5) => {
            Admin.create({
              user: response._id,
              activity: "Doctor successfully signed in",
              auditedAt: new Date(),
            })
              .then((result) => {
                console.log("Doctor Successfully signed in updated in admin");
              })
              .catch((err) => {
                console.log("Admin Error");
                res.status(401).send(`Admin Error:${err.message}`);
              });

            const resp = {
              token: token,
              msg: "Successfully signed up",
              data: {
                userData: response,
                doctorData: response5,
              },
            };
            res.end(JSON.stringify(resp));
          })
          .catch((err) => {
            console.log("Doctor Error");
            res.status(401).send(`Doctor Error${err.message}`);
          });
      }
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.post("/loginWithFB", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  User.findOne({ email: email })
    .exec()
    .then((response) => {
      const token = jwt.sign({ userId: response._id }, config.app.jwtSecret);

      Admin.create({
        user: response._id,
        activity: "User logged in successfully",
        auditedAt: new Date(),
      }).then((res) => {
        console.log("Admin: User logged in successfully");
      });

      ECG.findOne({ user: response._id })
        .exec()
        .then((response2) => {
          Goal.findOne({ user: response._id })
            .exec()
            .then((response3) => {
              DayToDayGoal.findOne({ user: response._id })
                .exec()
                .then((response4) => {
                  console.log("User Home Page Info");
                  const resp = {
                    token: token,
                    msg: "Successful login",
                    data: {
                      id: response._id,
                      firstName: response.firstName,
                      lastName: response.lastName,
                      caloriesGoal: response3.caloriesGoal
                        ? response3.caloriesGoal
                        : null,
                      waterGoal: response3.waterGoal
                        ? response3.caloriesGoal
                        : null,
                      currentECG: response2.currentECG,
                      currentCaloriesGoal: response4
                        ? response4.currentCaloriesGoal
                        : null,
                      currentWaterGoal: response4
                        ? response4.currentWaterGoal
                        : null,
                      caloriesGoalReached: response4
                        ? response4.caloriesGoalReached
                        : null,
                      waterGoalReached: response4
                        ? response4.waterGoalReached
                        : null,
                    },
                  };
                  res.end(JSON.stringify(resp));
                });
            });
        });
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.post("/loginWithGoogle", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  User.findOne({ email: email })
    .exec()
    .then((response) => {
      const token = jwt.sign({ userId: response._id }, config.app.jwtSecret);

      Admin.create({
        user: response._id,
        activity: "User logged in successfully",
        auditedAt: new Date(),
      }).then((res) => {
        console.log("Admin: User logged in successfully");
      });

      ECG.findOne({ user: response._id })
        .exec()
        .then((response2) => {
          Goal.findOne({ user: response._id })
            .exec()
            .then((response3) => {
              DayToDayGoal.findOne({ user: response._id })
                .exec()
                .then((response4) => {
                  console.log("User Home Page Info");
                  const resp = {
                    token: token,
                    msg: "Successful login",
                    data: {
                      id: response._id,
                      firstName: response.firstName,
                      lastName: response.lastName,
                      caloriesGoal: response3.caloriesGoal
                        ? response3.caloriesGoal
                        : null,
                      waterGoal: response3.waterGoal
                        ? response3.caloriesGoal
                        : null,
                      currentECG: response2.currentECG,
                      currentCaloriesGoal: response4
                        ? response4.currentCaloriesGoal
                        : null,
                      currentWaterGoal: response4
                        ? response4.currentWaterGoal
                        : null,
                      caloriesGoalReached: response4
                        ? response4.caloriesGoalReached
                        : null,
                      waterGoalReached: response4
                        ? response4.waterGoalReached
                        : null,
                    },
                  };
                  res.end(JSON.stringify(resp));
                });
            });
        });
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

module.exports = router;
