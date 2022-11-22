const { Developer } = require("../models/developer");

const getDevelopers = async (req, res, next) => {
  let developers;

  try {
    developers = await Developer.findAll();
  } catch (error) {
    res.status(401).json({
      message: "unable to find developers",
      error,
    });
    return;
  }

  res.json(developers);
};

const getDeveloper = async (req, res, next) => {
  let developerID = req.params.id;

  let developer;
  try {
    developer = await Developer.findByPk(developerID);
  } catch (error) {
    res.status(404).json({
      message: "unable to find developer with that id",
      error,
    });
  }

  res.json(developer);
};

const createDeveloper = async (req, res, next) => {
  const { name } = req.body;

  let developer;

  try {
    developer = await Developer.create({
      name,
    });
  } catch (error) {
    res.status(422).json({
      message: "error creating developer in database",
      error: error,
    });
    return;
  }

  res.status(201).json({
    id: developer.id,
    message: "developer created successfully",
  });
};

const updateDeveloper = async (req, res, next) => {
  const developerID = req.params.id;

  let developer;
  try {
    developer = await Developer.findByPk(developerID);
  } catch (e) {
    res.status(404).json({
      message: "unable to find developer with that id",
      error: e,
    });
    return;
  }

  const { name } = req.body;

  developer.name = name;

  try {
    await developer.save();
  } catch (e) {
    res.status(422).json({
      message: "error updating developer in database",
      error: e,
    });
    return;
  }

  res.status(200).json({
    message: "developer updated successfully",
  });
};

const deleteDeveloper = async (req, res, next) => {
  const developerID = req.params.id;

  let developer;
  try {
    developer = await Developer.findByPk(developerID);
  } catch (e) {
    res.status(404).json({
      message: "unable to find developer with that id",
      error: e,
    });
    return;
  }

  try {
    await developer.destroy();
  } catch (e) {
    res.status(422).json({
      message: "error deleting developer in database",
      error: e,
    });
    return;
  }

  res.status(200).json({
    message: "developer deleted successfully",
  });
};

module.exports = {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
};
