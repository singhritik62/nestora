import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const user = new User(req.body);
  const saved = await user.save();
  res.status(201).json(saved);
};