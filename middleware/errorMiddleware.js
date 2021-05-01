const errorMiddleware = (err, req, res, next) => {
	if (err) {
		res.status = res.status && 500;
		res.json({
			message: err.message,
		});
	}
	next();
};

export default errorMiddleware;
