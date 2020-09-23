import mongoose, { ConnectionOptions } from "mongoose";

const dbOptions: ConnectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
};

mongoose
	.connect("mongodb://localhost/companydb", dbOptions)
	.catch(err => console.error(err));
