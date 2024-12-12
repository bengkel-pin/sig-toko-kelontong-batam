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
        .min(1, "Kamu harus mengupload minimal 1 gambar.")
        .max(3, "Kamu hanya bisa mengupload maksimal 3 gambar."),
    default_image: z.string({message: "Pilih salah satu gambar sebagai default."}),
    id: z.coerce.number().int(), // Coerce to integer for SERIAL (primary key)
    name: z.string().min(1, { message: "Nama toko harus diisi." }).max(255, { message: "Nama toko harus kurang dari 255 karakter." }),
    price_min: z.coerce.number().gt(0, { message: "Harga minimum harus lebih dari Rp 0." }),
    price_max: z.coerce.number().gt(0, { message: "Harga maksimum harus lebih dari Rp 0." }),
    latitude: z.coerce.number().min(1, { message: "Latitude harus diisi."}),
    longitude: z.coerce.number().min(1, { message: "Longitude harus diisi." }),
    opens: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Isi waktu buka dengan benar." }), // Validates TIME format
    closes: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Isi waktu tutup dengan benar." }), // Validates TIME format
    subdistrict: z.string().min(1, { message: "Kecamatan harus dipilih." }).max(255, { message: "Kecamatan harus kurang dari 255 karakter." }),
});

export const UpdateShopFormSchema = z.object({
    id: z.coerce.number().int(), // Coerce to integer for SERIAL (primary key)
    name: z.string().min(1, { message: "Nama toko harus diisi." }).max(255, { message: "Nama toko harus kurang dari 255 karakter." }),
    price_min: z.coerce.number().gt(0, { message: "Harga minimum harus lebih dari Rp 0." }),
    price_max: z.coerce.number().gt(0, { message: "Harga maksimum harus lebih dari Rp 0." }),
    latitude: z.coerce.number().min(1, { message: "Latitude harus diisi."}),
    longitude: z.coerce.number().min(1, { message: "Longitude harus diisi." }),
    opens: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Isi waktu buka dengan benar." }), // Validates TIME format
    closes: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Isi waktu tutup dengan benar." }), // Validates TIME format
    subdistrict: z.string().min(1, { message: "Kecamatan harus dipilih." }).max(255, { message: "Kecamatan harus kurang dari 255 karakter." }),
});
