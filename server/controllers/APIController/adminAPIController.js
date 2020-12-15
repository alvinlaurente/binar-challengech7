import { userGames, userRoles } from '../../models';

class adminAPIController {
  static getUserlist = async (req, res) => {
    try {
      await userGames.findAll({
        attributes: ['userId', 'username', 'roleRank'],
        order: [['roleRank', 'ASC'], ['username', 'ASC']],
        include: [
          {
            model: userRoles,
            attributes: ['role'],
          },
        ],
      }).then((users) => res.status(200).json({ status: 200, message: 'Success', users }))
        .catch((error) => res.status(400).json({ error: error.name }));

      return res.status(200);
    } catch {
      return res.status(403).json({ status: 403, message: 'Forbidden.' });
    }
  };

  static promote = async (req, res) => {
    try {
      const { userId } = req.body;
      await userGames.findOne({
        attributes: ['userId', 'email', 'username', ['roleRank', 'previous role rank']],
        where: { userId },
      })
        .then((user) => {
          if (user) {
            user.decrement('roleRank', { by: 1 });
            return res.status(200).json({ status: 200, user });
          }
          return res.status(422).json({ status: 422, message: 'No user found.' });
        })
        .catch((error) => res.status(400).json({ error: error.name }));
      return res.status(403);
    } catch {
      return res.status(500);
    }
  };

  static demote = async (req, res) => {
    try {
      const { userId } = req.body;
      await userGames.findOne({
        attributes: ['userId', 'email', 'username', ['roleRank', 'previous role rank']],
        where: { userId },
      })
        .then((user) => {
          if (user) {
            user.increment('roleRank', { by: 1 });
            return res.status(200).json({ status: 200, user });
          }
          return res.status(422).json({ status: 422, message: 'No user found.' });
        })
        .catch((error) => res.status(400).json({ error: error.name }));
      return res.status(403);
    } catch {
      return res.status(500);
    }
  };
}

export default adminAPIController;
