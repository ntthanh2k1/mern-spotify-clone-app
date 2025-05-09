import { clerkClient } from "@clerk/express";

const protectRoute = async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: `Error protectRoute module: ${error.message}.` });
  }
};

const requireAdmin = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);
    const isAdmin = user.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL;

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: `Error requireAdmin module: ${error.message}.` });
  }
};

export { protectRoute, requireAdmin };