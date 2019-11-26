import getUserId from '../helpers/getUserId';

const Query = {
  async users(parent, args, { prisma }, info) {
    const opAargs = {};

    if (args.query) {
      opAargs.where = {
        OR: [{ name_contains: args.query }, { email_contains: args.query }],
      };
    }

    const users = await prisma.query.users(opAargs, info);
    return users;
  },
  async me(parent, args, { prisma, request }) {
    const userId = await getUserId(request);

    return prisma.query.user({ where: { id: userId } });
  },
};

export default Query;
