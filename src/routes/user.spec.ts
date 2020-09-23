import supertest from "supertest";
import app from "../app";
import { createServer } from "http";

const server = createServer(app);

const request = supertest(server);

import config from "../config";

/* User test */

describe("Users routes (/api/user/)", () => {
	it("Create a user", done => {
		request
			.post("/api/user")
			.set("Accept", "application/json")
			.set("x-access-token", config.tokens.adminToken)
			.send({
				username: "testuser",
				email: "testuser@test.com",
				password: "testuser",
				roles: ["admin", "moderator"],
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});
});

/* _User test */
