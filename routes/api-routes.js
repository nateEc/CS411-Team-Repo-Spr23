const router = require('express').Router();
const User = require('../models/user-model');

router.post('/favorites/:userId', async (req, res) => {
  const { userId } = req.params;
  const { movieId, isFavorite } = req.body;

  try {
    if (isFavorite) {
      await User.findOneAndUpdate(
        { googleId: userId },
        { $addToSet: { favoriteMovies: movieId } }
      );
    } else {
      await User.findOneAndUpdate(
        { googleId: userId },
        { $pull: { favoriteMovies: movieId } }
      );
    }

    res.status(200).json({ message: 'User favorites updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating user favorites' });
  }
});

router.get('/favorites/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ googleId: userId });
    if (user) {
      res.status(200).json({ favoriteMovies: user.favoriteMovies });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching user favorites' });
  }
});

module.exports = router;
