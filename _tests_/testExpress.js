import "@babel/polyfill";  
const request = require("supertest");
const app = require("../src/server/index.js");

describe('GET /' , () => {
    it("Test endpoint", async done => {
        const response = await request(app).get("/"); 
        expect(response.status).toBe(200);
        done();
    });
})
