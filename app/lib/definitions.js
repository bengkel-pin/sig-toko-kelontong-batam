import { z } from "zod";

export const SigninFormSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters long." }).trim(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .trim(),
});

export const FormSchema = z.object({
    images: z
        .array(
            z.object({
                name: z.string(),
                size: z.number().max(3 * 1024 * 1024, "File size must be less than 3 MB"), // Limit size to 3 MB
            })
        )
        .min(1, "You at least need to upload 1 image")
        .max(3, "You can upload a maximum of 3 images"),
    default_image: z.string(),
    id: z.coerce.number().int(), // Coerce to integer for SERIAL (primary key)
    name: z.string().min(1, { message: "Nama toko wajib diisi." }).max(255, { message: "Nama toko harus kurang dari 255 karakter." }),
    price_min: z.coerce.number().gt(0, { message: "Harga minimum harus lebih dari Rp 0." }),
    price_max: z.coerce.number().gt(0, { message: "Harga maksimum harus lebih dari Rp 0." }),
    latitude: z.coerce.number({ required_error: "Latitude wajib diisi." }),
    longitude: z.coerce.number({ required_error: "Longitude wajib diisi." }),
    opens: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Format waktu buka tidak valid (HH:MM)." }), // Validates TIME format
    closes: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Format waktu tutup tidak valid (HH:MM)." }), // Validates TIME format
    subdistrict: z.string().min(1, { message: "Kecamatan wajib diisi." }).max(255, { message: "Kecamatan harus kurang dari 255 karakter." }),
});

export const UpdateShopFormSchema = z.object({
    id: z.coerce.number().int(), // Coerce to integer for SERIAL (primary key)
    name: z.string().min(1, { message: "Nama toko wajib diisi." }).max(255, { message: "Nama toko harus kurang dari 255 karakter." }),
    price_min: z.coerce.number().gt(0, { message: "Harga minimum harus lebih dari Rp 0." }),
    price_max: z.coerce.number().gt(0, { message: "Harga maksimum harus lebih dari Rp 0." }),
    latitude: z.coerce.number({ required_error: "Latitude wajib diisi." }),
    longitude: z.coerce.number({ required_error: "Longitude wajib diisi." }),
    opens: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Format waktu buka tidak valid (HH:MM)." }), // Validates TIME format
    closes: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Format waktu tutup tidak valid (HH:MM)." }), // Validates TIME format
    subdistrict: z.string().min(1, { message: "Kecamatan wajib diisi." }).max(255, { message: "Kecamatan harus kurang dari 255 karakter." }),
});
