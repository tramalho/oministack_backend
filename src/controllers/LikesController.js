const dev = require('../models/Dev');

module.exports = {

    async store(req, res) {

        const { loggeddevid } = req.headers;
        const { likedDevId } = req.params;

        const loggedDev = await dev.findById(loggeddevid);
        const likedDev = await dev.findById(likedDevId);

        if (!likedDev) {
            return res.status(400).json({ error: "Dev not exists" });
        }

        if(likedDev.likes.includes(loggedDev._id)){
            console.log("Deu Match");
        }

        loggedDev.likes.push(likedDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}
