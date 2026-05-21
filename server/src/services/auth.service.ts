import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Note: Service layer = business logic layer
// register user
// hash password
// query database
// business rules

// Type.
type LoginInput = {
    email: string;
    password: string;
};

type RegiterInput = {
    email: string;
    password: string;
};


export async function registerUser({email, password}: RegiterInput) {
    // check if user already exists in the database.
    const exsistingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (exsistingUser) {
        throw new Error("User already exists");
    }

    // Hash password.
    const hashPassword = await bcrypt.hash(password, 10);

    if(!hashPassword) {
        throw new Error("Error hashing password");
    }

    const user = await prisma.user.create({
        data: {
            email,
            password: hashPassword,
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
        }
    })

    return user;

}

export async function loginUser({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
}