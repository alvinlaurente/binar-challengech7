import bcrypt from 'bcrypt';
import { userGames, userGameBiodata } from '../../models';
import checkUserId from '../../middlewares/authentication/checkUserId';

class authController {
  static getSignup = (req, res) => {
    const login = checkUserId(req.session);
    res.render('signup', { title: 'Sign Up', login, validateError: '' });
  };

  static postSignup = async (req, res) => {
    const login = checkUserId(req.session);

    try {
      const { email, username } = req.body;

      // TODO : Separate Middleware for checking email & username
      // Check email is already in database
      const emailExist = await userGames.findOne({ where: { email } });
      if (emailExist) return res.render('signup', { title: 'Sign Up', login, validateError: 'Email is already taken.' });

      // Check username is already in database
      const usernameExist = await userGames.findOne({ where: { username } });
      if (usernameExist) return res.render('signup', { title: 'Sign Up', login, validateError: 'Username is already taken.' });

      // Hash Password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await userGames.create({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      })
        .then((data) => userGameBiodata.create({
          userId: data.userId,
          name: req.body.name,
        }))
        .catch((e) => console.log(e));

      return res.redirect('/auth/login');
    } catch {
      return res.redirect('/auth/signup', { login });
    }
  };

  static getLogin = (req, res) => {
    const login = checkUserId(req.session);
    return res.render('login', { title: 'Login', login, validateError: '' });
  };

  static postLogin = async (req, res) => {
    const login = checkUserId(req.session);

    try {
      const { username, password } = req.body;

      // TODO : Separate Middleware for check email & username
      // Check stored username from database
      const validUsername = await userGames.findOne({ where: { username } });
      if (!validUsername) {
        return res.render('login', {
          title: 'Login', login, validateError: 'Username is wrong.',
        });
      }

      // Check password from username and compare
      // eslint-disable-next-line max-len
      const validPassword = await bcrypt.compare(password, validUsername.password);
      if (!validPassword) {
        return res.render('login', {
          title: 'Login', login, validateError: 'Password is wrong.',
        });
      }

      // Session data
      if (validUsername) {
        req.session.userId = validUsername.userId;
        req.session.username = validUsername.username;
      }

      return res.render('index', { title: 'Home', login: true, username: req.session.username });
    } catch {
      return res.redirect('/auth/login');
    }
  };

  static logout = (req, res) => {
    const login = checkUserId(req.session);
    // Delete session data & cookies
    req.session.destroy((err) => {
      if (err) {
        return res.render('index', { title: 'Home', login, username: '' });
      }
      res.clearCookie(process.env.SESSION_NAME);

      return res.redirect('/auth/login');
    });
  }
}

export default authController;
