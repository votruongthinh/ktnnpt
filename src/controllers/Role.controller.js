const Role = require("../models/Role.model");

// CREATE
exports.createRole = async (req, res) => {
  try {
    const newRole = new Role(req.body);
    await newRole.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isDelete: false });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id, isDelete: false });
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateRole = async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE mềm
exports.deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    res.json({ message: "Role deleted (soft)", deletedRole });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
