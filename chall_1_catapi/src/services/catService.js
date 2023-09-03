const axios = require('axios');

// URL of the external API. Placed here for simplicity (otherwise a config file would be best)
const baseURL = 'https://cataas.com/api';

//Use all 1114 cats from the external API. (Note: the default value of the external API CATASS seems to be 10).
const cats_count = 1114 // Modify this if you want to change the limit of cats for the 3rd endpoint (that matches a substring).

exports.fetchTags = async () => {
    const response = await axios.get(`${baseURL}/tags`);
    return response.data;
};


// Filter cats by tag;
// MUST HAVE the 3 parameters, otherwise an error response is returned (check middleware/validation.js).
exports.filterCatsByTag = async (tag, omit, total) => {
    const response = await axios.get(`${baseURL}/cats`, {
    params: {
        tags: tag,
        skip: omit,
        limit: total
    }
    });
    return response.data;
};
// Define an asynchronous function named matchCatsBySubstring
// "async" means this function will return a Promise
// MUST HAVE substr param;
exports.matchCatsBySubstring = async (substr) => {
    try {
      // Initialize variable for storing API response
      let tmp_response;

      // Fetch all tags from the external API
      const allTags = await this.fetchTags();
  
      // Convert substring to lowercase for case-insensitive matching
      const lowerSubstr = substr.toLowerCase();
  
      // Filter tags to find those that contain the given substring
      const matchingTags = allTags.filter(tag => tag.toLowerCase().includes(lowerSubstr));
      // Log the matching tags for debugging purposes
      console.log("Matching Tags:", matchingTags);


      // If there are no matching tags, return an empty object
      if (matchingTags.length === 0) {
        return {};
      }
      
      // Fetch cats from the external API. We use as limit the constant value we defined at the top of the file. I chose to use all the cats available on the external API which is 1114.
      tmp_response = await axios.get(`${baseURL}/cats`, {
        params: {
          limit: cats_count //cats_count
        }
      });

    
      // Initialize an empty object to hold the result
      let result = {};
      // Structure of the response:
      // Basically a hashmap where the keys are the tags found that contain the substring
      // And the values are the list of cats that belong to that tag (that was found).

      // Loop through each cat to see if it matches any of the tags


      for (const cat of tmp_response.data) {
        for (const tag of cat.tags) {
          if (matchingTags.includes(tag)) {
            if (!result[tag]) {
              result[tag] = [];
            }
            result[tag].push(cat);
          }
        }
      }

      return result;
  
    } catch (error) {
      // Log any errors
      //console.log("An error occurred:", error);
      //return {};
      throw error;
    }
  };

