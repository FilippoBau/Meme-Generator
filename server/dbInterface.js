"use strict";
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const db = new sqlite3.Database("memes.db", (err) => {
  if (err) throw err;
});

/**
 *
 * @param {string} sql
 * @param {Array<string>} params
 * @returns
 */
const db_getGeneric = (sql, params) => {
  if (sql.split("?").length - 1 !== params.length)
    throw "Invalid number of parameters";
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(
        rows.map((x) => {
          return {
            id: x.id,
            id_base: x.id_base,
            title: x.title,
            id_creator: x.id_creator,
            creator: x.creator,
            text1: x.text1 ? x.text1 : "",
            text2: x.text2 ? x.text2 : "",
            text3: x.text3 ? x.text3 : "",
            font: x.font,
            color: x.color,
            protect: x.protected ? true : false,
          };
        })
      );
    });
  });
};

const db_getAll = (userid) => {
  return db_getGeneric("SELECT * FROM memes ", []);
};

const db_getPublic = (userid) => {
  return db_getGeneric("SELECT * FROM memes WHERE protected = 0 ", []);
};

const db_getBases = () => {
  const sql = "SELECT * FROM images ";
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(
        rows.map((x) => {
          return {
            id: x.id,
            path: x.path,
            title: x.name,
            n: x.ntext,
            position: x.position,
          };
        })
      );
    });
  });
};

const db_creatememe = (meme) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO memes(id_base, title, id_creator,creator, text1,text2,text3,font, color,protected) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)";
    db.run(
      sql,
      [
        meme.id_base,
        meme.title,
        meme.id_creator,
        meme.creator,
        meme.text1,
        meme.text2,
        meme.text3,
        meme.font,
        meme.color,
        meme.protect,
      ],
      function (err) {
        if (err) return reject(err);

        resolve(this.lastID);
      }
    );
  });
};

const db_deletememe = (id, uid) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM memes WHERE id=? and id_creator = ?";
    db.run(sql, [id, uid], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return resolve({ error: `id ${id} not found` });

      resolve(id);
    });
  });
};

const db_getuserById = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id=?";
    db.get(sql, [id], function (err, row) {
      if (err) return reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        resolve({
          id: row.id,
          email: row.email,
          name: row.name,
        });
      }
    });
  });
};

const db_getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve(false);
      else {
        const user = { id: row.id, email: row.email, name: row.name };
        bcrypt.compare(password, row.hash).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

exports.db_getAll = db_getAll;
exports.db_getBases = db_getBases;
exports.db_getPublic = db_getPublic;

exports.db_creatememe = db_creatememe;
exports.db_deletememe = db_deletememe;

exports.db_getuserById = db_getuserById;
exports.db_getUser = db_getUser;
