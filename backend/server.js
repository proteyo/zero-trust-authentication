const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "SUPER_SECRET_KEY"; // поставь ENV если хочешь
const SESSION_EXPIRE = 10 * 60; // 10 minutes

let users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin"
  }
];

// ---- CREATE TOKEN ----
function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    SECRET,
    { expiresIn: SESSION_EXPIRE }
  );
}

// ---- MIDDLEWARE: CHECK TOKEN ----
function authMiddleware(roleRequired = null) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;

      if (roleRequired && decoded.role !== roleRequired) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}

// ---- REGISTER ----
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (users.find((u) => u.username === username)) {
    return res.json({ error: "User exists" });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password: bcrypt.hashSync(password, 10),
    role: "user"
  };

  users.push(newUser);

  res.json({ message: "Registered successfully" });
});

// ---- LOGIN ----
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.json({ error: "User not found" });

  if (!bcrypt.compareSync(password, user.password))
    return res.json({ error: "Invalid credentials" });

  const token = createToken(user);

  res.json({
    message: "Login successful",
    token,
    role: user.role
  });
});

// ---- PROTECTED ROUTE ----
app.get("/protected", authMiddleware(), (req, res) => {
  res.json({ message: "You are inside protected data", user: req.user });
});

// ---- ADMIN ROUTE ----
app.get("/admin", authMiddleware("admin"), (req, res) => {
  res.json({ message: "Admin panel", users });
});

// ---- ACCOUNT ----
app.get("/account", authMiddleware(), (req, res) => {
  res.json({ message: "Your account", user: req.user });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
