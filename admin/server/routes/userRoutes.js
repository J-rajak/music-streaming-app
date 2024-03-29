const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/admin/getUsers", verifyToken, getUsers);
router.put("/admin/:id", verifyToken, updateUser);
router.delete("/admin/:id", verifyToken, deleteUser);

module.exports = router;
