import { userGameHistories } from '../../models';

class gameAPIController {
  static createRoom = async (req, res) => {
    let result = '';
    const ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const alphanumLength = ALPHANUM.length;
    const resultLength = 6;
    for (let i = 0; i < resultLength; i++) {
      result += ALPHANUM.charAt(Math.floor(Math.random() * alphanumLength));
    }
    return res.json({ result });
  };

  static getGameHistory = async (req, res) => {
    try {
      return await userGameHistories.findAll({
        attributes: ['historyId', 'timestamps', 'player_choice', 'comp_choice', 'result'],
        where: { userId: req.params.id },
        order: [['timestamps', 'DESC']],
      }).then((history) => res.status(200).json({ status: 200, message: 'success', history }))
        .catch((error) => res.status(400).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Server Internal Error.' });
    }
  };

  static postGameHistory = async (req, res) => {
    try {
      // eslint-disable-next-line camelcase
      const { player_choice, comp_choice, result } = req.body;

      // eslint-disable-next-line camelcase
      if (player_choice && comp_choice && result) {
        return await userGameHistories.create({
          timestamps: new Date().toISOString(),
          userId: req.params.id,
          player_choice,
          comp_choice,
          result,
        })
          .then((history) => res.status(201).json({ status: 201, message: 'new history created', history }))
          .catch((error) => res.status(400).json({ error: error.name }));
      }
      return res.status(400).json({ status: 400, message: 'Bad Request.' });
    } catch {
      return res.status(500).json({ status: 500, message: 'Server Internal Error.' });
    }
  };

  static deleteGameHistory = async (req, res) => {
    try {
      const { historyId } = req.body;

      return await userGameHistories.destroy({ where: { historyId } })
        .then(() => res.status(200).json({ status: 200, message: `history ${historyId} deleted` }))
        .catch((error) => res.status(400).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Server Internal Error.' });
    }
  };
}

export default gameAPIController;
