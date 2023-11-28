const express = require('express')
const user=require('./models/User')

const router = new express.Router();
router.get("/users" , async (req, res) => {
    const users = await user.getAll()
    res.send(users)
})

router.get("/users/:id" , async (req, res) => {
    const userID = req.params.id
    const users = await user.getByID(userID)
    res.send(users)
})

router.get("/students" , async (req, res) => {
    const students = await user.getStudents()
    res.send(students)
})

router.get("/instractors" , async (req, res) => {
    const instractors = await user.getInstractors()
    res.send(instractors)
})
module.exports = router;