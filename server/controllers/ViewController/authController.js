import fetch from 'node-fetch';

class authController {
  static getSignup = (req, res) => res.status(200).render('signup', { title: 'Sign Up', login: false, validateError: '' });

  static postSignup = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/auth/signup/`, { method: 'POST', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          return res.redirect('/auth/login');
        }
        return res.render('signup', { title: 'signup', login: false, validateError: data.message });
      })
      .catch((e) => console.log(e));
  };

  static getLogin = (req, res) => res.status(200).render('login', { title: 'Login', login: false, validateError: '' });

  static postLogin = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/auth/login/`, { method: 'POST', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          res.cookie('username', data.username);
          return res.cookie(process.env.TOKEN_COOKIE, `Bearer ${data.token}`, {
            httpOnly: true,
            path: '/',
            expiryDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
            sameSite: true,
            // TODO: False for development, use true for production env (HTTPS)
            secure: false,
          }).redirect('/');
        }
        return res.status(200).render('login', { title: 'login', login: false, validateError: data.message });
      })
      .catch((e) => console.log(e));
  };

  static logout = async (req, res) => {
    await fetch(`http://localhost:${process.env.PORT_NUM}/api/v1/auth/logout/${req.decoded.userId}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 302) {
          res.clearCookie('username');
          res.clearCookie(process.env.TOKEN_COOKIE);

          return res.redirect('/auth/login');
        }
        return res.redirect('/');
      })
      .catch((e) => console.log(e));
  }
}

export default authController;
