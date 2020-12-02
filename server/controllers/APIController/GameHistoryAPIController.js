import { userGameHistories } from '../../models';

class gameAPIController {
  static getGameHistory = async (req, res) => {
    try {
      const history = await userGameHistories.findAll({
        attributes: ['historyId', 'timestamps', 'player_choice', 'comp_choice', 'result'],
        where: { userId: req.session.userId },
        order: [['timestamps', 'DESC']],
      })
        .catch((e) => console.log(e));

      return res.render('game_history', { title: 'Game History', username: req.session.username, history });
    } catch {
      return res.render('game_history', { title: 'Game History', username: req.session.username, history: '' });
    }
  };

  static postGameHistory = async (req, res) => {
    // TODO : Validate request!
    try {
      // eslint-disable-next-line camelcase
      const { player_choice, comp_choice, result } = req.body;

      await userGameHistories.create({
        timestamps: new Date().toISOString(),
        userId: req.session.userId,
        player_choice,
        comp_choice,
        result,
      }).catch((e) => console.log(e));

      return res.status(201);
    } catch {
      return res.redirect('/game');
    }
  };

  static deleteGameHistory = async (req, res) => {
    try {
      const { historyId } = req.body;

      await userGameHistories.destroy({ where: { historyId } })
        .catch((e) => console.log(e));

      return res.redirect('/game/history');
    } catch {
      return res.redirect('/game');
    }
  };
}

export default gameAPIController;
