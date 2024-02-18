import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    console.log("logged user ", req.user);

    const loggedUserId = req.user._id; // from midddleware

    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password"); // select("-password") dont give password // $ne: query for => except this

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in getUsersForSidebar controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
