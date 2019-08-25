import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/User.model';

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    });
    return ticket.getPayload();
  } catch (error) {
    console.error('Error verify auth token', error);
  }
};

const checkIfUserExist = async email => await User.findOne({ email }).exec();

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };
  return new User(user).save();
};

export const findOrCreateUser = async token => {
  const googleUser = await verifyAuthToken(token);
  const user = await checkIfUserExist(googleUser.email);
  return user ? user : createNewUser(googleUser);
};
