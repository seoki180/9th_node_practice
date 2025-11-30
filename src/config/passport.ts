import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export const passportConfig = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile: Profile, done) => {
      // 여기서 사용자 정보를 DB에 저장하거나 조회
      const user: User = {
        id: profile.id,
        email: profile.emails?.[0]?.value || '',
        name: profile.displayName,
        picture: profile.photos?.[0]?.value
      };
      return done(null, user);
    }
  )
);

// 세션에 사용자 정보 저장
passport.serializeUser((user: any, done) => {
  done(null, user);
});

// 세션에서 사용자 정보 복원
passport.deserializeUser((user: User, done) => {
  done(null, user);
});
