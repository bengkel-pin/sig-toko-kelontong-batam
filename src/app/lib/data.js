import { sql } from "@vercel/postgres";

export async function fetchAllShops() {
    try {
        const data = await sql`SELECT * FROM shops`;
        console.log(data.rows);
        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Gagal menarik data semua toko.");
    }
}

export async function fetchShopsBySubdistrict(subdistrict) {
    try {
        const data = await sql`SELECT * FROM shops WHERE subdistrict = ${subdistrict}`;
        console.log(data.rows);

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
    }
}

// import { unstable_noStore as noStore } from "next/cache";
// import { db } from "./firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";

// export async function fetchShops() {
//     noStore();
//     try {
//         const shopsCollection = collection(db, "shops"); // Reference to the 'shops' collection
//         const shopSnapshot = await getDocs(shopsCollection); // Get all documents
//         const shopList = shopSnapshot.docs.map((doc) => doc.data()); // Map to an array of data
//         return shopList;
//     } catch (error) {
//         console.error("Database Error:", error);
//         throw new Error("Gagal menarik data toko.");
//     }
// }

// const ITEMS_PER_PAGE = 6;
// export async function fetchShopPages(query) {
//     noStore();
//     try {
//         const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//         return totalPages;
//     } catch (error) {
//         console.error("Database Error:", error);
//         throw new Error("Gagal menarik total jumlah toko kelontong.");
//     }
// }

// export async function fetchShopsBySubdistrict(subdistrict) {
//     noStore();
//     try {
//         const shopsCollection = collection(db, "shops"); // Reference to the 'shops' collection

//         // Create a query to filter shops by subdistrict
//         const q = query(shopsCollection, where("subdistrict", "==", subdistrict));

//         const shopSnapshot = await getDocs(q); // Get all documents matching the query
//         const shopList = shopSnapshot.docs.map((doc) => doc.data()); // Map to an array of data
//         return shopList;
//     } catch (error) {
//         console.error("Database Error:", error);
//     }
// }
