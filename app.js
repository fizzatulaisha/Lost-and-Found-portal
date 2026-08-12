require("dotenv").config();
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const path = require("path");
const connectDB=require("./config/db");

const isLoggedIn = require("./middleware/auth");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
connectDB();
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const authRoutes = require("./routes/auth");
const contactRouter = require("./routes/about");

// const itemRoutes = require("./routes/item");
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


app.use(flash());

app.use((req, res, next) => {

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    res.locals.isLoggedIn = req.session.isLoggedIn || false;

    res.locals.session = req.session;

    next();
});

app.use(authRoutes);

app.use("/about", contactRouter);
const itemRoutes=require("./routes/item");

app.use(itemRoutes);

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/work",(req,res)=>{
    res.render("work");
});
app.use("/items", itemRoutes);
const Item = require("./models/Item");

app.get("/browse", isLoggedIn, async (req, res) => {

    const items = await Item.find().sort({ _id: -1 });

    res.render("browse", {
        items
    });

});
app.get("/report",(req,res)=>{
    res.render("report");
});
app.get("/about",(req,res)=>{
    res.render("about");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});


app.get("/report", isLoggedIn, (req, res) => {
    res.render("report");
});

// app.get("/browse", isLoggedIn, (req, res) => {
//     res.render("browse");
// });

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;