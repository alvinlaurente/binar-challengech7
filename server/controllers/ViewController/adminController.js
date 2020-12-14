import fetch from 'node-fetch';

class adminController {
  static getUserlist = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/admin/userlist/${req.decoded.userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.render('userlist', {
            title: 'User List', login: true, username: req.cookies.username, users: data.users,
          });
        }
        return res.render('userlist', {
          title: 'User List', login: true, username: req.cookies.username, history: '',
        });
      })
      .catch((e) => console.log(e));
  };

  static deleteUser = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/profile/deleteUser`, { method: 'DELETE', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.redirect('/admin/userlist');
        }
        return res.redirect('/');
      })
      .catch((e) => console.log(e));
  };
}

export default adminController;
