import express from "express";
import database from "./database.js";
import User from "./userModel.js";

const app = express();
app.use(express.json());

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

app.post

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
