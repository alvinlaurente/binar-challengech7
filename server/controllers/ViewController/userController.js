import fetch from 'node-fetch';

class userController {
  static getProfile = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/profile/${req.decoded.userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 403) {
          return res.render('changePassword', {
            title: 'Change Password', login: true, username: req.decoded.username || '', validateError: data.message,
          });
        }
        if (data.status === 200) {
          return res.render('profile', {
            // eslint-disable-next-line max-len
            title: req.decoded.username, login: true, user: data.profile, username: req.decoded.username,
          });
        }
        return res.render('profile', { title: 'Profile', login: true, username: req.decoded.username || '' });
      })
      .catch((e) => console.log(e));
  };

  static getEditProfile = async (req, res) => res.render('editProfile', {
    title: 'Edit Profile', login: true, username: req.decoded.username || '', validateError: '',
  });

  static getChangePassword = (req, res) => res.render('changePassword', {
    title: 'Change Password', login: true, username: req.decoded.username || '', validateError: '',
  });

  static patchEditProfile = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/profile/edit/${req.decoded.userId}`, { method: 'PATCH', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          return res.redirect('/profile');
        }
        return res.redirect('/profile/edit');
      })
      .catch((e) => console.log(e));
  };

  static patchChangePassword = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/profile/changePassword/${req.decoded.userId}&${req.decoded.username}`, { method: 'PATCH', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.redirect('/profile');
        }
        return res.render('changePassword', {
          title: 'Change Password', login: true, username: req.params.username || '', validateError: data.message,
        });
      })
      .catch((e) => console.log(e));
  };

  static deleteUser = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/profile/deleteUser/${req.decoded.userId}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          res.clearCookie(process.env.TOKEN_COOKIE_NAME);

          return res.render('login', { title: 'Login', login: false, validateError: '' });
        }
        return res.redirect('/profile');
      })
      .catch((e) => console.log(e));
  };
}

export default userController;
