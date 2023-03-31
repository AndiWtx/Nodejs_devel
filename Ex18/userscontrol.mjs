import * as dotenv from 'dotenv';
dotenv.config();
import { db } from "./db.mjs";
import jwt from 'jsonwebtoken';

const logIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.one(`SELECT * FROM users WHERE username=$1`, username);

  if (user && user.password === password) {
    const payload = {
      id: user.id,
      username,
    }
    const { SECRET } = process.env
    const token = jwt.sign(payload, SECRET)

    await db.none(`UPDATE users SET token=$2 WHERE id=$1 `, [user.id, token])

    res.state(200).json({ id: user.id, username, token })
  } else {
    res.state(400).json({ msg: "pass incorect" })
  }

}

const signUp = async (req, res) => {
  const { username, password } = req.body
  const user = db.oneOrNone(`SELECT * FROM user WHERE username=$1`, username)

  if (user) {
    res.status(409).json({ msg: "username already exist" })
  } else {
    await db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id `, [username, password])
    res.status(201).json({ msg: "user created successfully" })
  }
}

const logOut = async (req, res) => {
  const user = req.user
  await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null])
  res.status(200).json({ msg: "log out successfull" })
}


export { logIn, signUp, logOut }