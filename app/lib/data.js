"use server";
import { sql } from "@vercel/postgres";
import { formatCurrency } from "./utils";

export async function fetchAllShops() {
    try {
        const data = await sql`SELECT * FROM shops`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Gagal menarik data semua toko.");
    }
}

export async function fetchShopsBySubdistrict(subdistrict) {
    try {
        const data = await sql`SELECT * FROM shops WHERE subdistrict = ${subdistrict}`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
    }
}

export async function fetchShopById(id) {
    try {
        const data = await sql`
        SELECT
          *
        FROM shops
        WHERE shops.id = ${id};
      `;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch shop.");
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredShops(query, currentPage) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const shops = await sql`
        SELECT * FROM shops
        WHERE
            shops.name ILIKE ${`%${query}%`} OR
            shops.subdistrict ILIKE ${`%${query}%`}
        ORDER BY shops.name ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

        return shops.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch shops.");
    }
}

export async function fetchShopsPages(query) {
    try {
        const count = await sql`SELECT COUNT(*)
      FROM shops
      WHERE
        shops.name ILIKE ${`%${query}%`} OR
        shops.subdistrict ILIKE ${`%${query}%`}
    `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of shops.");
    }
}

export async function fetchLatestShops() {
    try {
        const data = await sql`
        SELECT id, name, default_image_url, price_min, price_max, subdistrict
        FROM shops
        ORDER BY id DESC
        LIMIT 5`;

        const latestShops = data.rows.map((shop) => ({
            ...shop,
            price_min: formatCurrency(shop.price_min),
            price_max: formatCurrency(shop.price_max),
        }));
        return latestShops;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the latest shops.");
    }
}

export async function fetchCardData() {
    try {
        const numberOfShopsPromise = sql`SELECT COUNT(*) FROM shops`;

        const theMostShopsInSubdistrictPromise = sql`
            SELECT subdistrict, COUNT(*) AS total_shops 
            FROM shops 
            GROUP BY subdistrict 
            ORDER BY total_shops DESC 
            LIMIT 1
        `;

        const priceAveragePromise = sql`
            SELECT AVG((price_min + price_max) / 2) AS average_price 
            FROM shops
        `;

        const openShopsPromise = sql`
            SELECT COUNT(*) AS open_shops
            FROM shops
            WHERE CURRENT_TIME BETWEEN opens::TIME AND closes::TIME
        `;

        const data = await Promise.all([numberOfShopsPromise, theMostShopsInSubdistrictPromise, priceAveragePromise, openShopsPromise]);

        console.log(data[3].rows[0])
        const numberOfShops = Number(data[0].rows[0].count ?? '0');

        const theMostShopsinSubdistrict = `${data[1].rows[0].subdistrict}(${data[1].rows[0].total_shops})`;

        const priceAverage = formatCurrency(Number(data[2].rows[0].average_price ?? '0'));

        const openShops = Number(data[3].rows[0].open_shops ?? '0');

        return {
            numberOfShops,
            theMostShopsinSubdistrict, // the desctructor variable receive undefined 
            priceAverage,
            openShops,
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch card data.");
    }
}
