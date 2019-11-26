import { makeHash, compareHash } from '../helpers/hash';
import { makeToken } from '../helpers/jwt';
import getUserId from '../helpers/getUserId';

const Mutation = {
  async createUser(parent, { data }, { prisma }) {
    // Validate e-mail already taken
    const emailTaken = await prisma.exists.User({ email: data.email });
    if (emailTaken) {
      throw new Error('Email already taken!');
    }

    const password = await makeHash(data.password);

    const user = await prisma.mutation.createUser({
      data: { ...data, password },
    });

    return {
      user,
      token: makeToken({ id: user.id }),
    };
  },
  async updateUser(parent, { data: dataIn }, { prisma, request }, info) {
    const userId = await getUserId(request);
    const data = {
      ...dataIn,
    };

    if (data.password) {
      data.password = await makeHash(data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: { id: userId },
        data,
      },
      info,
    );
  },
  async login(parent, { data }, { prisma }) {
    const { email, password } = data;

    const user = await prisma.query.user({ where: { email } });

    if (!user) {
      throw new Error('Unauthorized');
    }

    const isValidPass = await compareHash(password, user.password);

    if (!isValidPass) {
      throw new Error('Unauthorized');
    }

    return {
      user,
      token: makeToken({ id: user.id }),
    };
  },
};

export default Mutation;
