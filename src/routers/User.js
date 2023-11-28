const express = require("express")
const User = require("./models/User");
const router = new express.Router();

router.get("/users/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user = await User.getById(id);
  if(!user) {
    return res.send({
      message: "User not Found!"
    })
  }
  res.send(user);
});

router.get("/users", async (req, res) => {
  const users = await User.getAll();
  res.send(users);
});

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.getById(id);
  if(!user) {
    return res.send({
      message: "User not Found!"
    })
  }
  await User.deletee(id);
  res.send("Deleted");
});

router.post("/users/guest", async (req, res) => {
  const user = await User.addGuest();
  res.send(user);
});

module.exports = router;