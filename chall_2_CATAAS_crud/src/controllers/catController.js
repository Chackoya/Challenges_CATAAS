const { Cat } = require('../models');
const multer = require('multer');
const fs = require('fs').promises;


// multer : to work with images.
const upload = multer({ dest: 'uploads/' }); 

// Create a new cat, in case we put an image, use jpeg.
exports.createCat = [upload.single('imageData'), async (req, res, next) => {
  try {
    let imageData = null;
    if (req.file) {
      imageData = await fs.readFile(req.file.path);
    }

    const cat = await Cat.create({
      ...req.body,
      imageData
    });

    res.status(201).json(cat); //201: Successful request after a create, usually a POST
  } catch (err) {
    res.status(400).json({ error: err.message }); //400: Bad request (client should modify the request)

  }
}];

// Get all cats
exports.getAllCats = async (req, res, next) => {
  try {
    const cats = await Cat.findAll();
    res.status(200).json(cats); // 200 code : GET success
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single cat by ID
exports.getCatById = async (req, res, next) => {
  try {
    const cat = await Cat.findByPk(req.params.id);
    if (cat) {
      res.status(200).json(cat);
    } else {
      res.status(404).json({ error: 'Cat not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};







// Update a cat
exports.updateCat = [upload.single('imageData'), async (req, res, next) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      const imageData = await fs.readFile(req.file.path);
      updateData = { ...updateData, imageData };
    }

    const [affectedRows] = await Cat.update(updateData, { where: { id: req.params.id } });

    if (affectedRows) {
      res.status(200).json({ message: 'Cat updated successfully' });
    } else {
      res.status(404).json({ error: 'Cat not found' }); // 404: Not found, the resource does not exist
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}];

// Delete a cat
exports.deleteCat = async (req, res, next) => {
  try {
    const result = await Cat.destroy({ where: { id: req.params.id } });
    if (result) {
      res.status(200).json({ message: 'Cat deleted' });
    } else {
      res.status(404).json({ error: 'Cat not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




/*
Methods that deal with real images;
*/

// New method to serve an image of the cat
exports.getCatImage = async (req, res, next) => {
    try {
      const cat = await Cat.findByPk(req.params.id);
      if (cat && cat.imageData) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Assuming the image is jpeg
        res.end(cat.imageData, 'binary');
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
// New method to serve a random cat.
// Compute a random number that is used as offset (in case of non contiguous database ids)
// New method to serve a random cat image
exports.getRandomCatImage = async (req, res, next) => {
    try {
      // Get the count of all cats
      const count = await Cat.count();
  
      // If there are no cats, return a 404
      if (count === 0) {
        return res.status(404).json({ error: 'No cats found' });
      }
  
      // Generate a random offset
      const randomOffset = Math.floor(Math.random() * count);
  
      // Fetch the cat using findOne with an offset
      const cat = await Cat.findOne({
        offset: randomOffset,
      });
  
      if (cat && cat.imageData) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Assuming the image is jpeg
        res.end(cat.imageData, 'binary');
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  