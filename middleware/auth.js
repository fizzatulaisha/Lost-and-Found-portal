function isLoggedIn(req, res, next) {

    if (req.session.isLoggedIn) {
        return next();
    }

    req.flash("error", "Please login first.");

    res.redirect("/login");

}

module.exports = isLoggedIn;