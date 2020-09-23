import supertest from "supertest";
import app from "../app";
import { createServer } from "http";

const server = createServer(app);

const request = supertest(server);

/* Auth tests */

describe("Auth routes (/api/auth)", () => {
	const number = Math.ceil(Math.random() * 100);

	it("Sign up", done => {
		request
			.post("/api/auth/signup")
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.send({
				username: `superadmin${number}`,
				email: `superadmin${number}@test.com`,
				password: `superadmin${number}`,
				roles: ["moderator", "admin"],
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});

	it("Sign in", done => {
		request
			.post("/api/auth/signin")
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.send({
				email: `superadmin${number}@test.com`,
				password: `superadmin${number}`,
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});
});

/* _Auth tests */
