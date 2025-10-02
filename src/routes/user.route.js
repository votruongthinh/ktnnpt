const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  activateUser,
} = require("../controllers/User.controller");

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/username/:username", getUserByUsername);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/activate", activateUser);

module.exports = router;
