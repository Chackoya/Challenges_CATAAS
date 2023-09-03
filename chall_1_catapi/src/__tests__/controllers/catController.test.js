
const request = require('supertest');
const app = require('../../index'); // 

/*
Tests for the controller.

Validation of parameters and such.

Codes:
- 200: Successful request, often a GET
- 400: Bad request (client should modify the request)  -> Missing parameters;
- 500: server error;
*/




// Test suite for GET /api/v1/tags
describe('GET /api/v1/tags', () => {
  // Test case for 200 OK response
  it('should return 200 OK', done => {
    request(app)
      .get('/api/v1/tags')  // Making a GET request to /api/v1/tags
      .expect(200, done);  // Expecting a 200 OK response
  });
});

//------------------------------------------------------------------------------------


// Test suite for GET /api/v1/cats/filter
describe('GET /api/v1/cats/filter', () => {
  // Happy case.
  it('should return 200 OK with valid parameters', done => {
    request(app)
      .get('/api/v1/cats/filter?tag=cute&omit=0&total=10')
      .expect(200, done);
  });

  // Missing parameters test.
  it('should return 400 Bad Request with missing parameters', done => {
    request(app)
      .get('/api/v1/cats/filter')
      .expect(400, done);
  });

  // Case where we put total as a string instead of an integer.
  
  it('should return 400 Bad Request when total is a wrong type', done => {
    request(app)
      .get('/api/v1/cats/filter?tag=cute&omit=0&total=wrongtype')
      .expect(400, done);
  });
  
});



//------------------------------------------------------------------------------------


describe('GET /api/v1/cats/match', () => {
  // happy case.
  it('should return 200 OK with valid parameters', done => {
    request(app)
      .get('/api/v1/cats/match?string=cute')
      .expect(200, done);
  });

  
  //missing parameters.
  it('should return 400 Bad Request with missing parameters', done => {
    request(app)
      .get('/api/v1/cats/match')
      .expect(400, done);
  });
  
});
