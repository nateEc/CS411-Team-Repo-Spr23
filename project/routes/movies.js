const express = require('express');
const router = express.Router();
//const fetch = require("node-fetch").then(module => module.default);

router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params;
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=<your_api_key>&query=${query}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;