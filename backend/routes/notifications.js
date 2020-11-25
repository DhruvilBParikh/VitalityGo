const express = require("express");
const mongoose = require("../utils/mongoose-bootstrapper");
const authUtils = require("../utils/jwt-token");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = mongoose.model("User");
const Notification = mongoose.model("Notification");
const Doctor = mongoose.model("Doctor");
const Patient = mongoose.model("Patient");
const Request = mongoose.model("Request");
const config = require("config");
const Admin = mongoose.model("Admin");

router.get("/:userId/getNotifications", authUtils, (req, res) => {
  const { userId } = req.params;

  Notification.find({ userId: userId, responded: false })
    .populate({
      path: "fromUser",
    })
    .sort([["createdAt", -1]])
    .exec()
    .then((response) => {
      const resp = {
        msg: "",
        data: response,
      };
      res.status(200).send(JSON.stringify(resp));
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.put("/:notificationId/updateNotification", authUtils, (req, res) => {
  const { notificationId } = req.params;

  Notification.findByIdAndUpdate(
    notificationId,
    {
      $set: {
        responded: true,
      },
    },
    { new: true }
  )
    .exec()
    .then((response) => {
      console.log("Notification checked:", response);
      const resp = {
        msg: "Responded successfully changed",
        data: {},
      };

      res.status(200).send(JSON.stringify(resp));
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.put("/:userId/respondStatus", authUtils, (req, res) => {
  const { toUser, status, description } = req.body;
  const { userId } = req.params;

  Request.findOneAndUpdate(
    { toUser: userId, fromUser: toUser },
    {
      $set: {
        status: status,
      },
    },
    { new: true }
  )
    .exec()
    .then((response2) => {
      Notification.create({
        title: "Request " + status,
        description: description,
        fromUser: userId,
        userId: toUser,
        responded: false,
        createdAt: new Date(),
      })
        .then((response4) => {
          Admin.create({
            user: userId,
            activity: "User changed the status",
            auditedAt: new Date(),
          })
            .then((response5) => {
              if (status === "approved") {
                Doctor.findOneAndUpdate(
                  { userId: userId },
                  { $push: { patients: toUser } }
                )
                  .then((response6) => {
                    Patient.findOneAndUpdate(
                      { userId: toUser },
                      { $push: { doctors: userId } }
                    )
                      .then((response7) => {
                        console.log("Admin: User changed the status");
                        const resp = {
                          msg: "Status successfully changed",
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
              } else {
                const resp = {
                  msg: "Status successfully changed",
                  data: {},
                };

                res.status(200).send(JSON.stringify(resp));
              }
            })
            .catch((err) => {
              res.status(401).send(err.message);
            });
        })
        .catch((err) => {
          res.status(401).send(err.message);
        });
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

router.post("/:fromUser/sendNotification", authUtils, (req, res) => {
  const { toUser, title, description, data } = req.body;
  const { fromUser } = req.params;
  Notification.create({
    userId: toUser,
    fromUser: fromUser,
    title: title,
    description: description,
    data: data,
    createdAt: new Date(),
    responded: false,
  })
    .then((response) => {
      Admin.create({
        user: toUser,
        activity: "User received the notification",
        auditedAt: new Date(),
      })
        .then((response2) => {
          console.log("Admin: Notification sent to user");
        })
        .catch((err) => {
          res.status(401).send(err.message);
        });

      const resp = {
        msg: "Notification successfully sent",
        data: {},
      };

      res.status(200).send(JSON.stringify(resp));
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

module.exports = router;
