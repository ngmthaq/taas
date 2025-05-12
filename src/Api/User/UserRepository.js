const { prisma } = require("../../@Core/Services/DatabaseService");

class UserRepository {
  async findAll(filter, sortCol, sortDir, page, take, withTrash = false) {
    const skip = (page - 1) * take;
    const idFilter = Number(filter);
    const isIdFilter = Number.isInteger(idFilter) && !isNaN(idFilter);

    const conditions = {
      deletedAt: withTrash ? undefined : null,
      OR: isIdFilter
        ? [
            { id: idFilter },
            { name: { contains: filter } },
            { email: { contains: filter } },
          ]
        : [{ name: { contains: filter } }, { email: { contains: filter } }],
    };

    const totalUsers = await prisma.user.count({
      where: conditions,
    });

    const totalPages = Math.ceil(totalUsers / take);

    const takeUsers = await prisma.user.findMany({
      where: conditions,
      skip: skip,
      take: take,
      orderBy: {
        [sortCol]: sortDir,
      },
    });

    const users = takeUsers.map((user) => this.removePassword(user));

    return {
      users: users,
      totalPages: totalPages,
      totalUsers: totalUsers,
    };
  }

  async findById(id, withTrash = false) {
    const user = await prisma.user.findUnique({
      where: { id, deletedAt: withTrash ? undefined : null },
    });

    if (!user) return null;

    return this.removePassword(user);
  }

  async findByEmail(email, withTrash = false) {
    const user = await prisma.user.findUnique({
      where: { email, deletedAt: withTrash ? undefined : null },
    });

    if (!user) return null;

    return this.removePassword(user);
  }

  async create(data) {
    const user = await prisma.user.create({ data });

    return this.removePassword(user);
  }

  async update(id, data) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return this.removePassword(user);
  }

  async delete(id) {
    const user = await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return this.removePassword(user);
  }

  async restore(id) {
    const user = await prisma.user.update({
      where: { id },
      data: { deletedAt: null },
    });

    return this.removePassword(user);
  }

  removePassword(user) {
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

module.exports = UserRepository;
