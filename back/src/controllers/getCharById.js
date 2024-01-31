const axios = require("axios")
const express = require("express")
const { API_KEY } = process.env;

const getCharById = async (req, res)=>{
  
  try {
    const { id } = req.params
    const URL = `https://rym2.up.railway.app/api/character/${id}?key=${API_KEY}`
    const response = await axios(URL);
    
    const { name, gender, origin, status, image, species } = response.data;

    let character = {
      id,
      status,
      name,
      species,
      origin,
      image,
      gender
    };

    return res.status(200).json(character);

  } catch (error) {
    return res.status(500).send(error.message);
  }
  
   
}

module.exports = getCharById;