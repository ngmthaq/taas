const dayjs = require("dayjs");
const { prisma } = require("../../@Core/Services/DatabaseService");
const EncryptionService = require("../../@Core/Services/EncryptionService");
const TokenService = require("../../@Core/Services/TokenService");
const AUTH_REFRESH_TOKEN_CONFIG = require("./AuthRefreshTokenConfig");

class AuthRepository {
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email, deletedAt: null },
    });

    if (!user) return null;

    const isPasswordValid = EncryptionService.compare(password, user.password);
    if (!isPasswordValid) return null;

    return this.removePassword(user);
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

    return this.removePassword(user);
  }

  async changePassword(userId, newPassword) {
    const hashedNewPassword = EncryptionService.encrypt(newPassword);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return this.removePassword(updatedUser);
  }

  async refreshToken(token) {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    const user = await prisma.user.findUnique({
      where: { id: refreshToken.userId, deletedAt: null },
    });

    const newAccessToken = TokenService.createAccessToken(user);
    const newRefreshToken = TokenService.createRefreshToken();

    await prisma.refreshToken.update({
      where: { token },
      data: {
        token: newRefreshToken,
        expiresAt: dayjs()
          .add(AUTH_REFRESH_TOKEN_CONFIG.expiredIn, "second")
          .toDate(),
      },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  removePassword(user) {
    if (!user) return null;
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

module.exports = AuthRepository;
