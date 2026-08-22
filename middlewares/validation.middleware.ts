
import { Request, Response, NextFunction } from "express";

export const validateSignUp = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            msg: "Invalid email"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            msg: "Password must be at least 6 characters"
        });
    }

    if (role !== "freelancer" && role !== "client") {
        return res.status(400).json({
            msg: "Role must be freelancer or client"
        });
    }

    next();
};


export const validateSignIn = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "Email and password are required"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            msg: "Invalid email"
        });
    }

    next();
};

export const validateGig = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, description, price } = req.body;

    // Required fields
    if (!title || !description || price === undefined) {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }

    // Price must be a positive number
    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({
            msg: "Price must be a positive number"
        });
    }

    next();
};