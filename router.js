const passport = require('passport')

const clientUrl = 'http://localhost:3000'

module.exports = (app) => {

    app.get(
        '/test',
        (req, res) => {
            res.send({message: "test called successfully"})
        }
    );

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect(`${clientUrl}/dashbord`);
            res.send(req.user);
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect(clientUrl);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}