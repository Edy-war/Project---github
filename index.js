import express from "express";
import database from "./database.js";
import cors from "cors";
import User from "./userModel.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      success: true,
      message: "users berhasil di ambil",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/registrasi", async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({
            username,
            email,
            password
        });
        return res.status(201).json({
            success : true,
            message : "user berhasil dibuat",
            data : user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: "Email dan password tidak boleh kosong!" 
        });
    }

    try {
        const user = await User.findOne({
            where: {
                email: email,
                password: password 
            }
        });

        if (!user) {
            return res.status(401).json({ 
                message: "Email atau password salah!" 
            });
        }

        return res.status(200).json({
            message: "Login berhasil!",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Detail Error:", error);
        return res.status(500).json({ 
            message: "Terjadi kesalahan pada server",
            error: error.message 
        });
    }
});

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
