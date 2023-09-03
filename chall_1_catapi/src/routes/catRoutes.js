// Router file;
// BASE URL: '/api/v1/...'


const express = require('express');
const catController = require('../controllers/catController');

const router = express.Router();

router.get('/tags', catController.getTags); 
//Tags usage for postman:  http://localhost:3000/api/v1/tags


router.get('/cats/filter', catController.filterCats);   
// Filter usage for postman http://localhost:3000/api/v1/cats/filter?tag={{filtertag}}&omit={{number}}&total={{number}}
//http://localhost:3000/api/v1/cats/filter?tag=cute&omit=5&total=10




router.get('/cats/match', catController.matchCats);
//http://localhost:3000/api/v1/cats/match?string={{substr}}

//example usage 
//http://localhost:3000/api/v1/cats/match?string=br 




module.exports = router;
