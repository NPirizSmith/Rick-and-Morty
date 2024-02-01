const { Favorite, User } = require("../DB_connection");

const postFav = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { id, name, origin, status, image, species, gender, userId } = req.body;

        // Validar datos
        if (!id || !name || !origin || !status || !image || !species || !gender || !userId) {
            return res.status(401).json({ message: "Faltan datos" });
        }

        // Crear el favorito y asociarlo al usuario
        const favChar = await Favorite.findOrCreate({ where: { id, name, origin, status, image, species, gender } });

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Asociar el favorito al usuario
        await user.addFavorite(favChar[0]);

        // Obtener todos los favoritos asociados al usuario
        const allFavorites = await user.getFavorites();

        return res.json(allFavorites);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = postFav;