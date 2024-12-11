"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SigninFormSchema } from "./definitions";
import { createSession } from "./session";
import { deleteSession } from "./session";
import bcrypt from "bcrypt";
import { put, del } from "@vercel/blob";
import { FormSchema, UpdateShopFormSchema } from "./definitions";

const CreateShop = FormSchema.omit({ id: true }); // Skema untuk pembuatan toko baru tanpa `id`
const UpdateShop = UpdateShopFormSchema.omit({ id: true}); // Skema untuk memperbarui toko tanpa `id` dan default_image

export async function createShop(prevState, formData) {
    // Validate form fields using Zod
    const images = formData.getAll("images"); // Get images from FormData

    const validatedFields = CreateShop.safeParse({
        images: images.map((file) => {
            return {
                name: file.name,
                size: file.size,
            };
        }),
        default_image: formData.get("default_image"),
        name: formData.get("name"),
        price_min: formData.get("price_min"),
        price_max: formData.get("price_max"),
        latitude: formData.get("latitude"),
        longitude: formData.get("longitude"),
        opens: formData.get("opens"),
        closes: formData.get("closes"),
        subdistrict: formData.get("subdistrict"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Field validation failed. Failed to create shop.",
        };
    }

    // Prepare data for insertion into the database
    const { name, default_image, price_min, price_max, latitude, longitude, opens, closes, subdistrict } = validatedFields.data;

    // console.log(default_image)
    // Step 1: Upload images to blob storage
    let uploadedImages = [];
    let defaultImageIndex = null;
    for (let [index, file] of images.entries()) {
        try {
            if (file.name === default_image) {
                defaultImageIndex = index;
            }
            const uniqueFileName = `${name}-${index}${file.name.substring(file.name.lastIndexOf("."))}`;
            const path = `uploads/shops/images/${uniqueFileName}`;
            const blob = await put(path, file, { access: "public" });

            // console.log(blob)
            // console.log(blob.url)
            uploadedImages.push({
                name: file.name,
                url: blob.url,
            });
        } catch (error) {
            return {
                message: `Failed to upload image: ${file.name}`,
                error: error.message,
            };
        }
    }

    const defaultImageUrl = uploadedImages[defaultImageIndex]?.url;
    let otherImages = uploadedImages.filter((_, index) => index !== defaultImageIndex);

    // Now ensure the default image is always placed in the first position
    let finalUploadedImages = [uploadedImages[defaultImageIndex], ...otherImages];

    try {
        await sql`
            INSERT INTO shops 
                (name, default_image_url, image_2_url, image_3_url, price_min, price_max, latitude, longitude, opens, closes, subdistrict)
            VALUES 
                (${name}, ${finalUploadedImages[0]?.url}, ${finalUploadedImages[1]?.url || null}, ${finalUploadedImages[2]?.url || null}, ${price_min}, ${price_max}, ${latitude}, ${longitude}, ${opens}, ${closes}, ${subdistrict});
        `;
    } catch (error) {
        return {
            message: "Database Error: Failed to add shop.",
            error: error.message,
        };
    }
    revalidatePath("/dashboard/shops");
    redirect("/dashboard/shops");
}

export async function updateShop(id, prevstate, formData) {
    const validatedFields = UpdateShop.safeParse({
        name: formData.get("name"),
        price_min: formData.get("price_min"),
        price_max: formData.get("price_max"),
        latitude: formData.get("latitude"),
        longitude: formData.get("longitude"),
        opens: formData.get("opens"),
        closes: formData.get("closes"),
        subdistrict: formData.get("subdistrict"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Field validation failed. Failed to Update shop.",
        };
    }

    // Prepare data for insertion into the database
    const { name, price_min, price_max, latitude, longitude, opens, closes, subdistrict } = validatedFields.data;

    try {
        await sql`
          UPDATE shops
          SET name= ${name}, price_min = ${price_min}, price_max = ${price_max}, latitude=${latitude}, longitude=${longitude}, opens=${opens}, closes=${closes}, subdistrict=${subdistrict}
          WHERE id = ${id}
        `;
    } catch (error) {
        return { message: "Database Error: Failed to Update Shop." };
    }

    revalidatePath("/dashboard/shops");
    redirect("/dashboard/shops");
}

export async function deleteShop(id) {
    try {
        // Step 1: Retrieve the image pathnames for the shop
        const shopData = await sql`
            SELECT default_image_url, image_2_url, image_3_url
            FROM shops
            WHERE id = ${id};
        `;

        // If the shop does not exist, return an error
        if (shopData.length === 0) {
            return {
                message: "Shop not found. Deletion aborted.",
                error: "Shop ID does not exist.",
            };
        }

        // Extract image URLs (if they exist) and determine the pathnames
        const imagePathnames = shopData[0] ? [shopData[0].default_image_url, shopData[0].image_2_url, shopData[0].image_3_url].filter(Boolean) : [];

        // Step 2: Delete the shop entry from the database
        await sql`
            DELETE FROM shops
            WHERE id = ${id};
        `;

        // Step 3: Delete each image from blob storage
        for (let imageUrl of imagePathnames) {
            const pathname = new URL(imageUrl).pathname; // Extract pathname for deletion

            try {
                await del(pathname); // Delete image from blob storage
            } catch (error) {
                console.error(`Failed to delete image at ${imageUrl}:`, deleteError);
                // Log the error for monitoring purposes
            }
        }

        revalidatePath("/dashboard/shops");

        return {
            message: "Deleted Shop",
        };
    } catch (error) {
        return {
            message: "Database Error: Failed to Delete Shop.",
            error: error.message,
        };
    }
}

async function getUser(username) {
    try {
        const user = await sql`SELECT * FROM users WHERE username=${username}`;
        return user.rows[0];
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export async function authenticate(state, formData) {
    // Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors;

        const firstField = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstField][0];

        console.log(errors);
        return firstErrorMessage;
    }

    const { username, password } = validatedFields.data;

    const user = await getUser(username);
    if (!user) {
        return "Username or Passsword is wrong";
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        return "Username or Passsword is wrong";
    }

    await createSession(user.id);

    redirect("/dashboard");
}

export async function logout() {
    deleteSession();
    redirect("/login");
}
