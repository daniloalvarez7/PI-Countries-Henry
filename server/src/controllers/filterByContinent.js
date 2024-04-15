// const {Country} = require('../db');
// const { response } = require('../server');

// const filterByContinent = async (req, res) =>{
//     const {continent} = req.params;
//     try {
//         const country = await Country.findAll({
//             where: { region: {continent}}
//         })
//         response.status(200).json()
//     } catch (error) {
//         response.status(500).statusMessage(error.message)
//     }
// }

// module.exports = {filterByContinent}

