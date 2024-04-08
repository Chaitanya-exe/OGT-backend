import Users from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const temp = await Users.findOne({ username: req.body.username });
    if (temp) {
      res.status(409).send({ err: `username already taken` });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newUser = new Users({
        ...req.body,
        password: hash,
      });
      await newUser.save();
      const idUser = await findOne({ username: req.body.username });
      const token = jwt.sign(
        {
          id: idUser._doc._id,
          username: req.body.username,
          isEmployer: req.body.isEmployer,
          country: req.body.country,
          phNumber: req.body.phNumber,
          email: req.body.email,
        },
        process.env.JWT_KEY,
        { expiresIn: "10h" }
      );

      const { password, ...resUser } = newUser;
      res.status(201).json({ msg: "User created", token, user: resUser });
    }
  } catch (err) {
    res.status(400).json({ error: `some_error` });
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (user) {
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (isCorrect) {
        const { password, ...info } = user._doc;
        const token = jwt.sign(
          {
            id: info._id,
            username: info.username,
            isEmployer: info.isEmployer,
            country: info.country,
            phNumber: info.phNumber,
            email: info.email,
          },
          process.env.JWT_KEY,
          { expiresIn: "10h" }
        );
        return res.status(200).json({ token, info });
      } else {
        return res.status(403).json({ error: "wrong username or password" });
      }
    } else {
      return res.status(404).json({ error: `not Signed In` });
    }
  } catch (err) {
    return res.status(403).json({ error: `${err}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Users.findOneAndDelete({ username: req.body.username });
    return res.status(201).json({ message: `user deleted successfully` });
  } catch (err) {
    return res.status(400).json({ error: `${err}` });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        country: req.body.country,
      },
      {
        new: true,
      }
    );

    const { password, ...info } = info;

    return res.status(200).json({ message: "user updated", info });
  } catch (err) {
    return res.status(403).json({ error: `${err}` });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    const resUsers = allUsers.map((d) => {
      const { password, ...info } = d._doc;
      return info;
    });
    if (resUsers) {
      res.status(200).send(resUsers);
    }
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const a_user = await Users.findOne({ _id: req.params.id });
    if (a_user) {
      const { password, ...info } = a_user._doc;
      return res.status(200).send(info);
    } else {
      return res.status(404).json({ error: "profile not found" });
    }
  } catch (err) {
    return res.status(400).send({ error: `${err}` });
  }
};
