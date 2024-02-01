const { Favorite, User } = require("../DB_connection");

const postFav = async (req, res) => {
    try {

        const { id, name, origin, status, image, species, gender, userId } = req.body;

        if (!id || !name || !origin || !status || !image || !species || !gender || !userId) {
            return res.status(401).json({ message: "Faltan datos" });
        }

        const [favChar, created] = await Favorite.findOrCreate({
            where: { id, name, origin, status, image, species, gender }
        });

        if (created) {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            await user.addFavorite(favChar);
        }

        const allFavorites = await Favorite.findAll({
            include: [
                {
                    model: User,
                    as: "users",
                    attributes: ["id", "email"],
                    through: { attributes: [] } 
                }
            ]
        });

        return res.json(allFavorites);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = postFav;