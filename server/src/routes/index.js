const { Router } = require("express");

const router = Router();

router.get('/countries', (req, res) => {
    res.status(200).send('Acá van los países prro')
})


module.exports = router;
