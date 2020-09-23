import supertest from "supertest";
import app from "../app";
import Product from "../models/Product";
import { createServer } from "http";

const server = createServer(app);

const request = supertest(server);

import config from "../config";

/* Products test */

describe("Products routes (/api/products)", () => {
	const number = Math.ceil(Math.random() * 100);
	const ID = config.productId;

	describe("Get Products", () => {
		it("Get Products By ID", done => {
			request
				.get(`/api/products/${ID}`)
				.set("Accept", "application/json")
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					done();
				});
		});

		it("Get All products", done => {
			request
				.get("/api/products")
				.set("Accept", "application/json")
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					done();
				});
		});
	});

	describe("Post Products", () => {
		it("Create a new Product", done => {
			request
				.post("/api/products")
				.set("Accept", "application/json")
				.set("x-access-token", config.tokens.adminToken)
				.send({
					name: "PS5",
					category: "Electronics",
					price: 499.99,
					imgURL: "url",
				})
				.expect(201)
				.end((err, res) => {
					if (err) return done(err);
					done();
				});
		});
	});

	describe("Put Products", () => {
		it("Update a product", done => {
			request
				.put(`/api/products/${ID}`)
				.set("Accept", "application/json")
				.set("x-access-token", config.tokens.adminToken)
				.send({
					name: `Xbox series ${number}`,
					category: "electronics",
					price: 900 + number,
					imgURL: "url",
				})
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					done();
				});
		});
	});

	describe("Delete Products", () => {
		let deleteId;

		beforeAll(async () => {
			deleteId = await new Product({
				name: "PS5",
				category: "Electronics",
				price: 499.99,
				imgURL: "url",
			})._id;
		});

		it("Delete a product", done => {
			request
				.delete(`/api/products/${deleteId}`)
				.set("Accept", "application/json")
				.set("x-access-token", config.tokens.adminToken)
				.expect(204)
				.end((err, res) => {
					if (err) return done(err);
					done();
				});
		});
	});
});

/* _Products test */
