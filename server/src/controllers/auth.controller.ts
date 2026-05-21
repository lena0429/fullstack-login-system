import { z } from 'zod';
import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import { prisma } from "../prisma/client";
import { AuthRequest } from "../middleware/auth.middleware";

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export async function register(req: Request, res: Response) {
  try {
    const validateData  = registerSchema.parse(req.body);

    const user = await registerUser(validateData);

    return res.status(201).json({
      message: 'User registered successfully',
      user,
    })

  } catch (error) {
    if(error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Invalid request body',
        errors: error.issues,
      });
    }

    if (error instanceof Error && error.message === "User already exists") {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    return res.status(200).json({
      message: "User logged in successfully",
      ...result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: error.issues,
      });
    }

    if (error instanceof Error && error.message === "Invalid credentials") {
      return res.status(401).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function me(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}