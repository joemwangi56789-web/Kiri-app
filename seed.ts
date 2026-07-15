import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const home = await prisma.category.upsert({
    where: { slug: "home" },
    update: {},
    create: { name: "Home", slug: "home" },
  });
  const kitchen = await prisma.category.upsert({
    where: { slug: "kitchen" },
    update: {},
    create: { name: "Kitchen", slug: "kitchen" },
  });
  const garden = await prisma.category.upsert({
    where: { slug: "garden" },
    update: {},
    create: { name: "Garden", slug: "garden" },
  });

  const products = [
    {
      name: "Stoneware Pitcher",
      slug: "stoneware-pitcher",
      description:
        "Hand-thrown stoneware pitcher with a reactive ash glaze. Holds 1.5L, dishwasher safe.",
      priceCents: 4800,
      imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
      inventory: 24,
      categoryId: kitchen.id,
    },
    {
      name: "Linen Table Runner",
      slug: "linen-table-runner",
      description:
        "Stonewashed European linen, 14x90 inches. Softens beautifully with every wash.",
      priceCents: 3600,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      inventory: 40,
      categoryId: home.id,
    },
    {
      name: "Cast Iron Trowel",
      slug: "cast-iron-trowel",
      description:
        "Forged carbon steel trowel with an oiled ash handle. Built to outlast you.",
      priceCents: 2900,
      imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      inventory: 15,
      categoryId: garden.id,
    },
    {
      name: "Beeswax Candle Set",
      slug: "beeswax-candle-set",
      description:
        "Set of three hand-dipped beeswax tapers. Slow-burning, faintly honeyed.",
      priceCents: 2200,
      imageUrl: "https://images.unsplash.com/photo-1602874801007-bd36c5a9d9d5?w=800",
      inventory: 60,
      categoryId: home.id,
    },
    {
      name: "Walnut Cutting Board",
      slug: "walnut-cutting-board",
      description:
        "Solid walnut end-grain board, finished with food-safe mineral oil.",
      priceCents: 6800,
      imageUrl: "https://images.unsplash.com/photo-1594639326997-e78e4d759d70?w=800",
      inventory: 18,
      categoryId: kitchen.id,
    },
    {
      name: "Terracotta Planter",
      slug: "terracotta-planter",
      description:
        "Unglazed terracotta, 8-inch diameter with drainage hole and saucer.",
      priceCents: 1800,
      imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
      inventory: 50,
      categoryId: garden.id,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@fieldandfern.test" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@fieldandfern.test",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("Seed complete. Admin login: admin@fieldandfern.test / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
