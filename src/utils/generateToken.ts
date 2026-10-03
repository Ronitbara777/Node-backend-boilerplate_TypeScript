import jwt from 'jsonwebtoken';

const generateAccessToken = (id:string|object) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || "15m") as any,
  });
};

const generateRefreshToken = (id:string|object) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as any,
  });
};

export { generateAccessToken, generateRefreshToken };
