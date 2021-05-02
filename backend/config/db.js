import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true,
		});

		console.log(`MongoDB connected: ${conn.connection.host}`.brightCyan.bold);
	} catch (error) {
		console.log(error.brightRed);
		process.exit(1);
	}
};

export default connectDB;
