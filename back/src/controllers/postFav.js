const { Favorite, User } = require("../DB_connection");

const postFav = async (req, res) => {
   try {
      const userId = req.params.userId;
      const { id, name, origin, status, image, species, gender } = req.body;

      if (!id || !name || !origin || !status || !image || !species || !gender) {
         return res.status(401).json({ message: "Faltan datos" });
      }

      // Busca o crea el personaje favorito
      const [favChar, created] = await Favorite.findOrCreate({
         where: { id, name, origin, status, image, species, gender }
      });

      // Asocia el personaje favorito al usuario
      const user = await User.findByPk(userId); // Reemplaza req.userId con el identificador del usuario actual

      if (user) {
         await user.addFavorite(favChar);
      } else {
         console.error('Usuario no encontrado al intentar agregar un favorito');
      }

      // Obtiene todos los favoritos
      const allFavorites = await Favorite.findAll();
      return res.json(allFavorites);
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};

module.exports = postFav;