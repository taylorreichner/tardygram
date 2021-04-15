const { exchangeCodeForToken, getUserProfile } = require('../utils/github');
const User = require('../models/User');

module.exports = class UserService {
  static async create(code) {
    console.log('code:', code);
    const token = await exchangeCodeForToken(code);
    //console.log(token);
    const profile = await getUserProfile(token);
    const user = await User.findByUserName(profile.username);
    if (!user) {
      return User.insert(profile);
    } else {
      return user;
    }
  }
};
