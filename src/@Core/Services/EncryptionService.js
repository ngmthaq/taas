const crypto = require("crypto");

const IV_LENGTH = 16;
const ENCRYPTION_ALGORITHM = "aes-256-cbc";
const RAW_ENCRYPTION_KEY = process.env.APP_ENCRYPTION_KEY;
if (!RAW_ENCRYPTION_KEY) {
  throw new Error("APP_ENCRYPTION_KEY is not set in .env file");
}

const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(RAW_ENCRYPTION_KEY)
  .digest();

const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

const compare = (plain, encrypted) => {
  const decrypted = decrypt(encrypted);

  return plain === decrypted;
};

module.exports = {
  encrypt,
  decrypt,
  compare,
};
