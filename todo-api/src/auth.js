const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(options, (payload, done) => {
        return done(null, payload);
    })
)

module.exports = passport