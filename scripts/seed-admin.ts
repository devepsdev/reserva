import bcrypt from "bcryptjs";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function seedAdmin() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const email = "admin@restaurante.com";
  const password = "admin123";
  const name = "Administrador";

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Upsert: insert or update if exists
    await pool.query(
      `INSERT INTO "Admin" (email, password, name, "createdAt")
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (email) DO UPDATE SET password = $2, name = $3`,
      [email, hashedPassword, name]
    );

    console.log("Admin creado exitosamente:");
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log("");
    console.log("¡Cambia la contraseña después del primer login!");
  } catch (error) {
    console.error("Error al crear admin:", error);
  } finally {
    await pool.end();
  }
}

seedAdmin();
