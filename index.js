import express from "express";
import database from "./database.js";
import cors from "cors";
import Users from "./userModel.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json({
      success: true,
      message: "users berhasil di ambil",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Users.destroy({
            where: { id: id}
        });
        if (deleted) {
            res.status(200).json({ message : (`user dengan id ${id} berhasil dihapus`)})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const updated = await Users.update(
            { username, email, password },
            { where: { id: id }}
        );
        if (updated) {
            res.status(200).json({ message : (`user dengan id ${id} berhasil diperbarui`)});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email, dan password tidak boleh kosong!"
            });
        }

        const cekUsername = await Users.findOne({ where: { username } });
        if (cekUsername) {
            return res.status(400).json({
                success: false,
                message: "Username sudah digunakan! Silahkan pilih username lain."
            });
        }

        const cekEmail = await Users.findOne({ where: { email } });
        if (cekEmail) {
            return res.status(400).json({
                success: false,
                message: "Email sudah terdaftar! Silahkan gunakan email lain."
            });
        }

        const cekPassword = await Users.findOne({ where: { password } });
        if (cekPassword) {
            return res.status(400).json({
                success: false,
                message: "Password sudah digunakan! Silahkan pilih password lain."
            });
        }

        const user = await Users.create({
            username,
            email,
            password
        });

        return res.status(201).json({
            success: true,
            message: "User berhasil dibuat",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Detail Error:", error);
        return res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: "Email dan password tidak boleh kosong!" 
        });
    }

    try {

        const user = await Users.findOne({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).json({ 
                message: "Akun belum terdaftar! Silahkan registrasi terlebih dahulu." 
            });
        }

        if (user.password !== password) {
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
