import User from "../models/user.model.js";

const register = async (req, res) => {
  try {
    const { userId, firstName, lastName, imageUrl } = req.body;

    const existingUser = await User.findOne({ cleckUserId: userId });

    if (!existingUser) {
      const newUser = new User({
        clerkUserId: userId,
        fullName: `${firstName} ${lastName}`,
        profileImageUrl: imageUrl
      });

      await newUser.save();
    }

    res.status(201).json({ message: "Register successfully." });
  } catch (error) {
    res.status(500).json({ message: `Error register module: ${error.message}.` });
  }
};

const login = async (req, res) => {

};

const logout = async (req, res) => {

};

export { register, login, logout };
