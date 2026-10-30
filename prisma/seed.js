require("dotenv").config();
const bcrypt = require("bcryptjs");
const prisma = require("../src/lib/prisma");

// ====== VARIANTE (dígito 2) ======
const FECHA = "2026-11-12";
const CANCHA_A = "Fútbol 2"; // 08:00 - 10:00
const CANCHA_B = "Pádel 1"; // 10:00 - 12:00
const MI_NOMBRE = "Joselyn Isamar Morocho Quishpe";
const MI_CORREO = "jimorocho4@espe.edu.ec";
const MI_PASSWORD = "user123";
// =====================================

async function main() {
  // 1) Borrar en orden: booking -> schedule -> user
  await prisma.booking.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.user.deleteMany();

  // 2) Usuarios (bcrypt, costo 10)
  const admin = await prisma.user.create({
    data: {
      name: "Paulo Galarza",
      email: "paulo.galarza@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  const yo = await prisma.user.create({
    data: {
      name: MI_NOMBRE,
      email: MI_CORREO,
      password: await bcrypt.hash(MI_PASSWORD, 10),
      role: "USER",
    },
  });

  // 3) Los dos horarios de tu variante (UTC)
  const horarioA = await prisma.schedule.create({
    data: {
      court: CANCHA_A,
      startTime: new Date(`${FECHA}T08:00:00Z`),
      endTime: new Date(`${FECHA}T10:00:00Z`),
    },
  });

  const horarioB = await prisma.schedule.create({
    data: {
      court: CANCHA_B,
      startTime: new Date(`${FECHA}T10:00:00Z`),
      endTime: new Date(`${FECHA}T12:00:00Z`),
    },
  });

  // 4) Al menos 2 reservas usando connect
  await prisma.booking.create({
    data: {
      date: new Date(`${FECHA}T00:00:00Z`),
      user: { connect: { id: yo.id } },
      schedule: { connect: { id: horarioA.id } },
    },
  });

  await prisma.booking.create({
    data: {
      date: new Date(`${FECHA}T00:00:00Z`),
      user: { connect: { id: admin.id } },
      schedule: { connect: { id: horarioB.id } },
    },
  });

  console.log("Seed OK: 2 usuarios, 2 horarios, 2 reservas");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());