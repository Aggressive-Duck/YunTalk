// const users = [
//   { id: 1, username: "admin", password: "password" }
// ];

const db = require("../db/queries");


exports.login = async (req, res) => {
  
  const { username, password } = req.body;

  const users = await db.getAllUserAuthInfo();


  const user = users.find(u => u.name === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  // For demo: just return a fake token
  res.json({ token: "demo-token", user: { id: user.id, username: user.username } });
};