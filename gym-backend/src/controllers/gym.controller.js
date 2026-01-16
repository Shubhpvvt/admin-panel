const Gym = require("../models/Gym.model");

exports.createGym = async (req, res) => {
  console.log("REQ BODY =>", req.body); // DEBUG

  const { name, status } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Gym name is required" });
  }

  const gym = await Gym.create({
    name,
    status: status || "Active",
  });

  res.status(201).json({ gym });
};

exports.getGyms = async (req, res) => {
  const gyms = await Gym.find().sort({ createdAt: -1 });
  res.json(gyms);
};

exports.updateGym = async (req, res) => {
  const gym = await Gym.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ gym });
};

exports.deleteGym = async (req, res) => {
  await Gym.findByIdAndDelete(req.params.id);
  res.json({ message: "Gym deleted" });
};