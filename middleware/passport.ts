import {Strategy, ExtractJwt} from 'passport-jwt';
import {settings} from '../settings/settings';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: settings.secretKey,
};

export default function pass();
