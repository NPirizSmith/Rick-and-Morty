const  { User, Favorite } = require("../DB_connection");

const login = async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!email || !password) return res.status(400).send("Faltan datos");
    
    const userFind = await User.findOne({ where: { email }
    });
    
    if (!userFind) return res.status(404).json({ error: "Usuario no encontrado" });
    const allFavorites = await Favorite.findAll();
    console.log(allFavorites);
    return userFind.password === password ? res.json({ access: true, favorites: Array.isArray(allFavorites) ? allFavorites : [] }) :
    res.status(403).send("Contraseña incorrecta")
    
  }catch (error) {
    return res.status(500).send(error.message)
  }
};

module.exports = login