import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES = "7d";

// POST /auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role = "patient" } = req.body || {};
    if (!name || !email || !password)
      return res.status(400).json({ error: "missing_fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "email_taken" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });

    const token = jwt.sign({ id: user._id, email, role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });
    res.status(201).json({
      token,
      user: { id: user._id, name, email, role },
    });
  } catch (e) {
    console.error("REGISTER error:", e);
    res.status(500).json({ error: "register_failed" });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "invalid_creds" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "invalid_creds" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error("LOGIN error:", e);
    res.status(500).json({ error: "login_failed" });
  }
});

// GET /auth/me
router.get("/me", async (req, res) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "no_token" });
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).lean();
    if (!user) return res.status(404).json({ error: "not_found" });

    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (e) {
    res.status(401).json({ error: "invalid_token" });
  }
});

export default router;
