import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../utils/auth.utils";

declare module "express-serve-static-core" {
	interface Request {
		email?: string;
		uid?: string;
	}
}

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const readHeaderToken = req.headers.authorization;

	if (!readHeaderToken) {
		res.status(401).json({ error: "No token provided" });
		return;
	}

	const token = readHeaderToken.split(" ")[1];

	try {
		const payload = verifyAccessToken(token);
		req.email = payload.email;
		req.uid = payload.uid;
		next();
	} catch (error) {
		console.log(error);

		if (error instanceof jwt.JsonWebTokenError) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		if (error instanceof jwt.TokenExpiredError) {
			res.status(401).json({ error: "Expired Token" });
			return;
		}

		res.status(500).json({ error: "An error occurred" });
		return;
	}
};
