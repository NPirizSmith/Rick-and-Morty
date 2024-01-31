const { Favorite } = require("../DB_connection")

postFav = async (req, res)=>{
    try {
    const {id, name, origin, status, image, species, gender} = req.body

    if(! id || !name || !origin || !status || !image || !species || !gender){
        return res.status(401).json({ message: "Faltan datos" })
    }
    const favChar = await Favorite.findOrCreate( {where: {id, name, origin, status, image, species, gender}} );

     const allFavorites = await Favorite.findAll({ where: {
        id, name, origin, status, image, species, gender
     } });
     return res.json(allFavorites);

    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

module.exports = postFav