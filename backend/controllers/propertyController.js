import Property from "../models/Property.js";

export const getProperties = async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
};

export const createProperty = async (req, res) => {
  const property = new Property(req.body);
  const saved = await property.save();
  res.status(201).json(saved);
};