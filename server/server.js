"use strict";

const express = require("express");
const morgan = require("morgan"); // logging middleware
const { check, validationResult, oneOf } = require("express-validator"); // validation middleware
const dbInterface = require("./dbInterface"); // module for accessing the DB

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

// init express
const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

//PARTE NUOVA PER AUTENTICAZIONE

passport.use(
  new LocalStrategy(function (username, password, done) {
    dbInterface.db_getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, {
          message: "Incorrect username and/or password.",
        });

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  dbInterface
    .db_getuserById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

app.use(
  session({
    secret: "WeboticcitobeW",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: "not authenticated" });
};

app.post("/api/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json(info);
    }

    req.login(user, (err) => {
      if (err) return next(err);

      return res.json(req.user);
    });
  })(req, res, next);
});

//// GET /api/loggedUser ////
app.get("/api/sessions/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send(req.user);
  } else res.status(401).json({ error: "Unauthenticated user!" });
});

app.delete("/api/sessions/current", (req, res) => {
  req.logout();
  res.end();
});

//FINE PARTE PER AUTENTICAZIONE

/*** APIs ***/

//// GET /api/memes ////
app.get("/api/memes", isLoggedIn, (req, res) => {
  dbInterface
    .db_getAll()
    .then((memes) => {
      res.status(200).json(memes);
    })
    .catch((err) =>
      res.status(500).json({ errors: `Database error: ${err}.` })
    );
});

//// GET /api/bases/ ////
app.get("/api/bases", (req, res) => {
  dbInterface
    .db_getBases()
    .then((bases) => {
      res.status(200).json(bases);
    })
    .catch((err) =>
      res.status(500).json({
        errors: `Database errors: $ { err }.`,
      })
    );
});
//// GET /api/memes/public/ ////
app.get("/api/memes/public", (req, res) => {
  dbInterface
    .db_getPublic()
    .then((memes) => {
      res.status(200).json(memes);
    })
    .catch((err) =>
      res.status(500).json({ errors: `Database error: ${err}.` })
    );
});

//// POST /api/memes ////
app.post(
  "/api/memes",
  [
    isLoggedIn,
    check("title").exists({ checkFalsy: true }).isString(),
    check("id_base").exists({ checkFalsy: true }).isInt({ min: 1 }),
    oneOf([
      check("text1").isLength({ min: 1 }),
      check("text2").isLength({ min: 1 }),
      check("text3").isLength({ min: 1 }),
    ]),
    check("text1").isString().isLength({ min: 0, max: 200 }),
    check("text2").isString().isLength({ min: 0, max: 200 }),
    check("text3").isString().isLength({ min: 0, max: 200 }),
    check("font").exists({ checkFalsy: true }).isString(),
    check("color").exists({ checkFalsy: true }).isString(),
    check("protect").isBoolean(),
  ],
  (req, res) => {
    //setTimeout(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const meme = {
      id_creator: req.user.id,
      creator: req.user.name,
      id_base: req.body.id_base,
      title: req.body.title,
      text1: req.body.text1,
      text2: req.body.text2,
      text3: req.body.text3,
      font: req.body.font,
      color: req.body.color,
      protect: req.body.protect,
    };

    dbInterface
      .db_creatememe(meme)
      .then((id) => res.status(201).json({ addedId: id }))
      .catch((err) =>
        res.status(503).json({
          errors: `Database error during the creation of meme: ${err}.`,
        })
      );
    //}, 10000);
  }
);

// DELETE /api/memes/<id> ////
app.delete(
  "/api/memes/:id",
  [isLoggedIn, check("id").isInt({ min: 1 })],
  (req, res) => {
    //setTimeout(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    dbInterface
      .db_deletememe(req.params.id, req.user.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(503).json({
          errors: `Database error deleting meme: ${err}.`,
        });
      });
    //  }, 2000);
  }
);

/**************************************************************************/
// Activate the server
app.listen(port, () => {
  console.log(`Express server listening at http: //localhost:${port}`);
});
