const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const SECRET_KEY = process.env.APP_ENCRYPTION_KEY;
if (!SECRET_KEY) {
  throw new Error("APP_ENCRYPTION_KEY is not set in .env file");
}

const createAccessToken = (user) => {
  if (!user) throw new Error("User is required to create access token");
  if (!user.id) throw new Error("User ID is required to create access token");
  const payload = { id: user.id };
  const options = { expiresIn: "1h", algorithm: "HS256" };
  const token = jwt.sign(payload, SECRET_KEY, options);

  return token;
};

const createRefreshToken = () => {
  return uuid.v4();
};

const verifyAccessToken = (token) => {
  try {
    if (!token) return null;
    const options = { algorithms: ["HS256"] };
    const decoded = jwt.verify(token, SECRET_KEY, options);

    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
};
