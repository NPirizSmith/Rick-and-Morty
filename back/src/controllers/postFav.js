const { Favorite, User } = require("../DB_connection");

const postFav = async (req, res) => {
    try {
        const { id, name, origin, status, image, species, gender, userId } = req.body;

        if (!id || !name || !origin || !status || !image || !species || !gender || !userId) {
            return res.status(401).json({ message: "Faltan datos" });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const favChar = await Favorite.findOrCreate({ where: { id, name, origin, status, image, species, gender } });

        await user.addFavorite(favChar[0]);

        const allFavorites = await user.getFavorites();

        return res.json(allFavorites);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = postFav;
