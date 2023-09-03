const catService = require('../services/catService');

/*
Controller.



Validation of the parameters that are required, error handling, and status reps.
*/

exports.getTags = async (req, res) => {
  try {
	  const tags = await catService.fetchTags();
	  res.status(200).json(tags);
  } catch (error) {
	  res.status(500).json({ message: 'Error fetching tags', error });
  }
};


/*
 filter cats by tag requires the validation of the inputs based on their type (domain) but also if they are present of course
*/

exports.filterCats = async (req, res) => {
  const { tag, omit, total } = req.query;

  // Check if parameters are present
  if (!tag || !omit || !total) {
    return res.status(400).json({ message: 'Missing required query parameters. Required: tag, omit, total' });
  }

  // Validate the domain of each parameter

  /*  This one is not needed it seems, there can be some integers as tags  (they are dealt as strings anyways)
  if (typeof tag !== 'string') {
    return res.status(400).json({ message: 'Invalid parameter: tag should be a string.' });
  }
  */
  
  // The following types should be integers. For omit and total.
  if (!Number.isInteger(Number(omit))) {
    return res.status(400).json({ message: 'Invalid parameter: omit should be an integer.' });
  }

  if (!Number.isInteger(Number(total))) {
    return res.status(400).json({ message: 'Invalid parameter: total should be an integer.' });
  }

  try {
    const cats = await catService.filterCatsByTag(tag, parseInt(omit, 10), parseInt(total, 10));
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering cats', error });
  }
};


exports.matchCats = async (req, res) => {
  const { string: substr } = req.query;
  //console.log ("HERE")
  if (!substr) {
	  return res.status(400).json({ message: 'Missing required query parameter: string' });
  }

  try {
	  const cats = await catService.matchCatsBySubstring(substr);
	  res.status(200).json(cats);
  } catch (error) {
	  res.status(500).json({ message: 'Error matching cats', error });
  }
};
