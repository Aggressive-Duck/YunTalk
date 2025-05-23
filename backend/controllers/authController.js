const users = [
  { id: 1, username: "admin", password: "password" }
];

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  // For demo: just return a fake token
  res.json({ token: "demo-token", user: { id: user.id, username: user.username } });
};