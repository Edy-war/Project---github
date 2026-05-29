import { Sequelize } from "sequelize";

const database = new Sequelize("database_user", "root", "", {
    host : "localhost",
    dialect : "mysql",
})

try {
    await database.authenticate();
    console.log("database berhasil terhubung")
} catch (error) {
    console.error("database gagal terhubung", BaseError)
}

export default database;