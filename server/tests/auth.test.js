const request = require("supertest");
const app = require("../src/app");

describe("Authentication", () => {

    test("Health API", async () => {

        const response = await request(app)
            .get("/api/health");

        expect(response.statusCode).toBe(200);

    });

});