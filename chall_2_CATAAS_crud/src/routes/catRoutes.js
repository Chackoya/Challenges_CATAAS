// Routes for the project. 

const express = require('express');
const catController = require('../controllers/catController');

const router = express.Router();


//ROUTES urls.
router.post('/', catController.createCat); // route to create a new cat.

// New routes for image display and random cat
router.get('/random', catController.getRandomCatImage); // Moved above `/:id`

//Those Gets return json data (the images are in BLOB: binary large object)

router.get('/', catController.getAllCats); //json data
router.get('/:id', catController.getCatById);//json data
router.put('/:id', catController.updateCat);
router.delete('/:id', catController.deleteCat);



// New route for image display based on ID.
router.get('/:id/image', catController.getCatImage); // actually shows the image.




module.exports = router;
