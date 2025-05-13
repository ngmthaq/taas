const dayjs = require("dayjs");
const { prisma } = require("../../@Core/Services/DatabaseService");
const { compare } = require("../../@Core/Services/EncryptionService");
const AUTH_REFRESH_TOKEN_CONFIG = require("./AuthRefreshTokenConfig");

class AuthRepository {
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email, deletedAt: null },
    });

    if (!user) return null;

    const isPasswordValid = compare(password, user.password);
    if (!isPasswordValid) return null;

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async saveRefreshToken(userId, refreshToken) {
    const savedRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt: dayjs()
          .add(AUTH_REFRESH_TOKEN_CONFIG.expiredIn, "second")
          .toDate(),
      },
    });

    return savedRefreshToken;
  }

  async whoami(id) {
    const user = await prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

module.exports = AuthRepository;
