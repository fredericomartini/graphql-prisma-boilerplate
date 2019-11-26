import getUserId from '../helpers/getUserId';

const User = {
  email: {
    fragment: 'fragment usuerId on User { id }',
    async resolve(parent, args, { request }) {
      const userId = await getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      }
      return null;
    },
  },
};

export default User;
