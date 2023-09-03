/*
File for Testing the Endpoints (cat Services).
*/

const axios = require('axios');
const catService = require('../../services/catService'); // This assumes catService.js is in the src/services/ folder


jest.mock('axios');  // Mocking the axios module
afterEach(() => {
  axios.get.mockClear();
});

// 1st endpoint Test suite for fetchTags method
describe('fetchTags', () => {
  // Test case for successful data fetch
  it('fetches successfully data from the API', async () => {
    axios.get.mockResolvedValue({ data: 'some data' });  // Mock the axios.get to return 'some data'
    const result = await catService.fetchTags();  // Call the method
    expect(result).toEqual('some data');  // Assert the returned value to be 'some data'
  });

  // Test case for unsuccessful data fetch
  it('fetches erroneously data from the API', async () => {
    axios.get.mockRejectedValue(new Error('An error occurred'));  // Mock the axios.get to throw an error
    await expect(catService.fetchTags()).rejects.toThrow('An error occurred');  // Assert that the method throws an error
  });
});



//------------------------------------------------------------------------------------



// 2nd endpoint Test suite: filterCatsByTag method
describe('filterCatsByTag', () => {
  it('fetches cats successfully by tag', async () => {
    axios.get.mockResolvedValue({ data: 'some cat data' });
    const result = await catService.filterCatsByTag('cute', 0, 10);
    expect(result).toEqual('some cat data');
  });

});



//------------------------------------------------------------------------------------


// 3rd endpoint test Matching

const mockTags = ["cute", "brazilian", "bread", "fluffly", "menacing", "brown"];
const mockCats = [
  { _id: '1', tags: ['cute', 'bread'] },
  { _id: '2', tags: ['menacing', 'big','brown'] },
  { _id: '3', tags: ['fluffly', 'upset'] },
  { _id: '4', tags: ['cute', 'brazilian'] },
  { _id: '5', tags: ['gg', 'brown','bread'] },
];
// Expected result with this mocked data and with the substring "br"
// An hashmap containing 3 keys: bread ; brown ; brazilia 
// And the values are the cats data "mockCats" that correspond to the tag.

describe('matchCatsBySubstring', () => {
  // first test (happy case)
  it('matches cats successfully by substring in tags', async () => {
    axios.get.mockResolvedValueOnce({ data: mockTags })
           .mockResolvedValueOnce({ data: mockCats });

    const result = await catService.matchCatsBySubstring('br');
    
    
    console.log ("RES;",result)
    expect(result).toHaveProperty('brazilian');
    expect(result['brazilian']).toEqual([{ _id: '4', tags: ['cute', 'brazilian'] }]);




    expect(result).toHaveProperty('bread');
    expect(result['bread']).toEqual([
      { _id: '1', tags: ['cute', 'bread'] },
      { _id: '5', tags: ['gg', 'brown','bread'] }
    ]);


    expect(result).toHaveProperty('brown');
    expect(result['brown']).toEqual([
      { _id: '2', tags: ['menacing', 'big','brown'] },
      { _id: '5', tags: ['gg', 'brown','bread'] },
    ]);


    console.log("RESULT DICTIONNARY:",result)
  });

  // when an error appears;
  it('matches erroneously cats by substring in tags', async () => {
    axios.get.mockRejectedValue(new Error('An error occurred'));

    await expect(catService.matchCatsBySubstring('br')).rejects.toThrow('An error occurred');
  });

});
