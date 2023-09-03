/*
UNIT TESTS FILE FOR CRUD OPERATIONS.


How to test this:
It requires the db running (on the container), so we can test it there on a real database, perform the steps:


-> Optional, just shutdown previous db and other services in case you ran the script_run_docker.sh file: 
docker compose down

Then build:
-> docker compose build

-> docker compose up -d mariadb adminer 
the cmd above will just run the db service... and not the app itself (wait a bit for it to start , around 1 minute).

Once the db is running, we can perform migrations on the server. 
-> npx sequelize-cli db:seed:all --config config/env_config.js

Then, we just do locally:
-> npm test
*/

const request = require('supertest');
const app = require('../app');
const { Cat } = require('../models');
const sequelize = require('../models').sequelize;


let createdCatId;


// we are trying to test in a database in a container, it should be empty at start... for testing. So we have to create just a cat before all tests. , 
// only name field is really required , metadata is optional, aswell as image. This is just to test basic CRUD operations
beforeAll(async () => {
  const cat = await Cat.create({ name: 'DummyCat', metadata: '{}' });
  createdCatId = cat.id;
});


// just in case, create a new cat before each test.
beforeEach(async () => {
  await Cat.destroy({ where: {} });
  const cat = await Cat.create({ name: 'DummyCat', metadata: '{}' });
  createdCatId = cat.id;
});



//close db connection.
afterAll(async () => {
  await sequelize.close();
});


// The tests here are just for json data, they don't test image endpoints. (that display the real cat image).


describe('Cat Controller', () => {
  describe('POST /cataas/', () => { // Creation of a cat(post)
    it('should create a new cat without an image and return 201', async () => {
      const response = await request(app)
        .post('/cataas/')
        .send({ name: 'DummyCatNew', metadata: '{}' });



      expect(response.status).toBe(201);
      expect(response.body.name).toBe('DummyCatNew');
    });
  });

  describe('GET /cataas/', () => {
    it('should get all cats and return 200', async () => {
      const response = await request(app).get('/cataas/');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });


  // Test get a cat based on ID.
  describe('GET /cataas/:id', () => {
    it('should get a cat by ID and return 200', async () => {
      const response = await request(app).get(`/cataas/${createdCatId}`);
      console.log("RESPONSE DATA:", response.body);
      

      //console.log("Response:",response.body)
      /*
      RESPONSE DATA: {
      id: 53,
      name: 'DummyCat',
      metadata: '{}',
      imageData: null,
      mimeType: null,
      createdAt: '2023-09-03T18:08:46.000Z',
      updatedAt: '2023-09-03T18:08:46.000Z'
      }
      */
      // it should be DummyCat
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('DummyCat');
      
    });
  });
  


  //-----------------------------------------------------------------

  
  describe('PUT /cataas/:id', () => {
    it('should update a cat and return 200', async () => {
      const response = await request(app)
        .put(`/cataas/${createdCatId}`)
        .send({ name: 'NotSoDummyCat' });

      
      console.log(response.body)
      console.log(response.status)
      expect(response.status).toBe(200);
      //expect(response.body.name).toBe('NotSoDummyCat'); 

      expect(response.body.message).toBe('Cat updated successfully');// the endpoint just returns a message , to say it was updated ., could also eventually modify the endpoint to return the cat itself..

    });


    // ERROR scenario update, cat doesnt exist.
    it('should return 404 when trying to update a cat that does not exist', async () => {
      const fakeId = 99999;
      const response = await request(app)
        .put(`/cataas/${fakeId}`)
        .send({ name: 'FakeCAT' });

      
      //console.log(response.body)
      //console.log(response.status)
      expect(response.status).toBe(404); // CODE 404: Not found, the resource does not exist
      expect(response.body.error).toBe('Cat not found');// 
    });



  });
  


  // remove a cat
  describe('DELETE /cataas/:id', () => {
    it('should delete a cat and return 200', async () => {
      const response = await request(app).delete(`/cataas/${createdCatId}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Cat deleted');
    });
  });


  describe('DELETE /cataas/:id Error Handling', () => {
    it('should return 404 when trying to delete a cat that does not exist', async () => {
      const fakeId = 99999; // Assuming this ID doesn't exist in the database
      const response = await request(app).delete(`/cataas/${fakeId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Cat not found');
    });
  });

  // more tests can be implemented, specially to the GET random cat images (that deal with real image) & errors ...
});

