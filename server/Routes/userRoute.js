const express = require('express');
const router = express.Router();
const { userModal } = require('../models/UserModal');

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await userModal.find();
        const userData = users.map(userInfo => ({
            email: userInfo.email,
            fullName: userInfo.fullName,
            userId: userInfo._id,
            img: userInfo.image_Id
        }));

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: `Error in fetching users: ${error}` });
    }
});

module.exports = router;
