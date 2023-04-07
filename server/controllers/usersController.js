import  Users from "../models/userModel.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const userNameCheck = await Users.findOne({ username });
    if (userNameCheck)
      return res.json({ msg: "User Name Already Taken", status: false });
    const emailCheck = await Users.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email Already Used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const { username , password } = req.body;
    const user = await Users.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect UserName or Password", status: false });
    const isValidPassword = await bcrypt.compare(password,user.password);
    if (!isValidPassword)
      return res.json({ msg: "Incorrect UserName or Password", status: false });
    delete user.password;
    res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const setAvatar = async (req, res, next) => {
  try{
    const userId = req.params.id
    const avatarImage = req.body.image
    const userData = await Users.findByIdAndUpdate(userId,{
      isAvatarImageSet: true,
      avatarImage
    })
    res.json({isSet: userData.isAvatarImageSet , image: userData.avatarImage})
  }
  catch (err) {
    next(err)
  }
}

export const getAllUsers = async (req, res, next) => {
  try{
    const users = await Users.find({_id:{$ne: req.params.id}}).select([
      "username",
      "email",
      "avatarImage",
      "_id"
    ])
    res.json(users)
  }
  catch(err) {

  }
}