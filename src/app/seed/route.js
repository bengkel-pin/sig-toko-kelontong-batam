// Menggunakan Firebase
// seed.js
// import { db } from "../lib/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { shops } from "../lib/placeholder-data";

// async function seedDatabase() {
//     try {
//         const shopsCollection = collection(db, "shops"); // Replace with your collection name

//         // Loop through the placeholder data and add each document to Firestore
//         shops.map(async (shop) => {
//             await addDoc(shopsCollection, shop);
//             console.log("Document added:", shop.name);
//         });

//         console.log("Database successfully seeded!");
//     } catch (error) {
//         console.error("Error seeding database:", error);
//     }
// }

// export async function GET() {
//     try {
//         await seedDatabase();
//     } catch (error) {
//         return Response.json({ error }, { status: 500 });
//     }
// }


// Menggunakan Postgres
// import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { shops } from "../lib/placeholder-data";

const client = await db.connect();

async function seedShops() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS shops (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            default_image VARCHAR(255),
            price_min NUMERIC NOT NULL,
            price_max NUMERIC NOT NULL,
            latitude NUMERIC NOT NULL,
            longitude NUMERIC NOT NULL,
            opens TIME NOT NULL,
            closes TIME NOT NULL,
            subdistrict VARCHAR(255) NOT NULL
        );
    `;

    const insertedShops = await Promise.all(
        shops.map(
            (shop) => client.sql`
                INSERT INTO shops (name, default_image, price_min, price_max, latitude, longitude, opens, closes, subdistrict)
                    VALUES (${shop.name}, ${shop.defaultImage}, ${shop.priceRange.min}, ${shop.priceRange.max}, ${shop.coordinates.latitude}, ${shop.coordinates.longitude}, ${shop.operatingHours.opens}, ${shop.operatingHours.closes}, ${shop.subdistrict}
                );
            `
        )
    );

    return insertedShops;
}

// export async function GET() {
//     try {
//         await client.sql`BEGIN`;
//         await seedShops();
//         await client.sql`COMMIT`;

//         return Response.json({ message: "Database seeded successfully" });
//     } catch (error) {
//         await client.sql`ROLLBACK`;
//         return Response.json({ error }, { status: 500 });
//     }
// }
