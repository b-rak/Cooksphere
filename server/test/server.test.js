import supertest from "supertest";
import { expect } from "chai";
import express from "express";
import router from "../router.js";

const app = express();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;
const request = supertest(app);

describe("Basic SERVER test", () => {
  it("Should respond to GET /status 🚀", async () => {
    const res = await request.get("/status");
    expect(res.status).equal(200);
    expect(res.text).equal("Server is running ✨🚀");
  });

  it("Should listen server on PORT 🛰️", async () => {
    const res = await request.get("/PORT");
    expect(res.status).equal(404);
    expect(res.text).equal(`Server listening on port ${PORT} 🙌✨`);
  });

  it("Should POST data ✨", async () => {
    const data = { message: "Hello, Server!" };
    const res = await request.post("/").send(data);
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(data);
  });
});
