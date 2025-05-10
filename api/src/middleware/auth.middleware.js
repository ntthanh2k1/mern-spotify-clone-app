import { clerkClient } from "@clerk/express";

const protectRoute = async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    next();
  } catch (error) {
    error.methodName = protectRoute.name;
    next(error);
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);
    const isAdmin = user.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL;

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden." });
    }

    next();
  } catch (error) {
    error.methodName = requireAdmin.name;
    next(error);
  }
};

export { protectRoute, requireAdmin };