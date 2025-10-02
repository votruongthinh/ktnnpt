const User = require("../models/User.model");

//Create new a user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//read all (tìm theo user name,fullname nếu  có query)
exports.getAllUsers = async (req, res) => {
  try {
    const { username, fullName } = req.query;
    let query = { isDelete: false };

    if (username) query.username = { $regex: username, $options: "i" };
    if (fullName) query.fullName = { $regex: fullName, $options: "i" };

    const users = await User.find(query).populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      isDelete: false,
    }).populate("role");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ by username
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
      isDelete: false,
    }).populate("role");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE mềm
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    res.json({ message: "User deleted (soft)", deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ACTIVE user (status = true nếu email và username đúng)
exports.activateUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ email, username, isDelete: false });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = true;
    await user.save();

    res.json({ message: "User activated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
