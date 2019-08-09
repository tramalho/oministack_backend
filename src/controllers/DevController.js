const axios = require('axios');
const dev = require('../models/Dev');

module.exports = {

    async index(req, res) {
        const { loggeddevid } = req.headers;
        const loggedDev = await dev.findById(loggeddevid);

        const devs = await dev.find({
            $and: [
                { _id: { $ne: loggedDev._id } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        return res.json(devs); 
    },

    async store(req, res) {

        const { username } = req.body;
        var resultdev = await dev.findOne({ user: username });

        if (!resultdev) {

            const response = await axios.get(`https://api.github.com/users/${username}`);
            const { name, bio, avatar_url } = response.data;

            resultdev = await dev.create({
                name: (name === null ? " " : name),
                user: username,
                bio: (bio === null ? " " : bio),
                avatar: (avatar_url === null ? " " : avatar_url),
            });
        }

        return res.json(resultdev);
    }
};