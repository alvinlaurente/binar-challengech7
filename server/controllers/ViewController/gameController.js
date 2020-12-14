import fetch from 'node-fetch';

class gameController {
  static getRoom = (req, res) => res.render('rockpaperscissor', { title: 'Rock Paper Scissor', username: req.decoded.username });

  static getGameHistory = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/game/history/${req.decoded.userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.render('game_history', { title: 'Game History', username: req.session.username, history: data.history });
        }
        return res.render('game_history', { title: 'Game History', username: req.session.username, history: '' });
      })
      .catch((e) => console.log(e));
  };

  static postGameHistory = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/game/history/${req.decoded.userId}`, { method: 'POST', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          return res.redirect('/game');
        }
        return res.status(403);
      })
      .catch((e) => console.log(e));
  };

  static deleteGameHistory = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/game/history/${req.decoded.userId}`, { method: 'DELETE', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.redirect('/game/history');
        }
        return res.redirect('/game');
      })
      .catch((e) => console.log(e));
  };
}

export default gameController;
