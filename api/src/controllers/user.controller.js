import User from "../models/user.model.js";

const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    // Get all users except myself
    const users = await User.find({ clerkUserId: { $ne: currentUserId } });

    res.status(200).json(users);
  } catch (error) {
    error.methodName = getAllUsers.name;
    next(error);
  }
};

export { getAllUsers };