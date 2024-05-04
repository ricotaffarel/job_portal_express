const { db } = require("../utils/db");
const { hashPassword } = require("../utils/password");

async function seed() {
    const pw = await hashPassword("password123")

    try {
        await db.user.create({
            data: {
                name: "admin",
                username: "admin",
                password: pw,
            }
        })
        console.log("admin user created")
    } catch (error) {
        console.error(error)
    }
}

seed()