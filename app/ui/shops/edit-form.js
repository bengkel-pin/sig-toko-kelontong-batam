"use client";

import Link from "next/link";
import { BuildingStorefrontIcon, ArrowDownRightIcon, ArrowUpRightIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { useActionState } from "react";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { startTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import { updateShop } from "@/app/lib/actions";

const initialState = { message: null, errors: {} };

export default function EditForm({ shop }) {
    const [state, formAction, isPending] = useActionState(updateShop.bind(null, shop.id), initialState);
    const [images, setImages] = useState([]);

    // const onDrop = (acceptedFiles) => {
    //     if (images.length + acceptedFiles.length > 3) {
    //         alert("You can only upload up to 3 images.");
    //         return;
    //     }
    //     setImages((prevImages) => [...prevImages, ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))]);
    // };

    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     accept: { "image/*": [] },
    //     maxFiles: 3,
    // });

    // const removeImage = (index) => {
    //     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    // };

    useEffect(() => {
        // Collect URLs from shop's properties and set up the images array
        const imageKeys = ["default_image_url", "image_2_url", "image_3_url"];
        const availableImages = imageKeys
            .map((key) => shop[key]) // Map to the URLs in shop
            .filter((url) => url); // Filter out any undefined or empty URLs

        // Update images state
        setImages(availableImages.map((url) => ({ name: url, preview: url })));
    }, [shop]);

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     const formData = new FormData(event.target);

    //     // Append images to FormData
    //     images.forEach((image) => {
    //         formData.append("images", image);
    //     });

    //     startTransition(() => {
    //         formAction(formData); // This triggers the async updateShop function
    //     });
    // };

    return (
        <form action={formAction}>
            {/* Image Upload (Drag And Drop) */}
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <div className="mb-2 flex justify-between items-center">
                        <label className="block text-sm font-medium">Gambar Toko</label>
                        <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-900" title="Ubah Gambar">
                            <PencilIcon className="w-4 h-4" />
                        </button>
                    </div>
                    {/* <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer">
                        <input {...getInputProps()} />
                        <p>Drag & drop images here, or click to select files</p>
                    </div> */}
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                        {images.map((file, index) => {
                            // console.log(images);
                            return (
                                <div key={file.name} className="relative flex justify-center items-center rounded-md w-full">
                                    <img src={file.preview} alt="preview" className="w-full aspect-square object-cover rounded-md" />
                                </div>
                            );
                        })}
                    </div>
                    <div id="image-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.images &&
                            state.errors.images.map((error, index) => (
                                <p className="mt-2 text-sm text-red-500" key={`${error}-${index}`}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>

            <div className="rounded-md bg-gray-50 p-4 md:p-6 mt-4">
                {/* Shop Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Nama Toko
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input id="name" name="name" type="text" placeholder="Enter shop name" defaultValue={shop.name} className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" aria-describedby="name-error" />
                            <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name &&
                            state.errors.name.map((error) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="price_min" className="mb-2 block text-sm font-medium">
                        Harga Terendah
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="price_min"
                                name="price_min"
                                type="number"
                                step="0.01"
                                placeholder="Enter minimum price"
                                defaultValue={shop.price_min}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="price_min-error"
                            />
                            <ArrowDownRightIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div id="price_min-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.price_min &&
                            state.errors.price_min.map((error) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="price_max" className="mb-2 block text-sm font-medium">
                        Harga Termahal
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="price_max"
                                name="price_max"
                                type="number"
                                step="0.01"
                                placeholder="Enter maximum price"
                                defaultValue={shop.price_max}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="price_max-error"
                            />
                            <ArrowUpRightIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div id="price_max-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.price_max &&
                            state.errors.price_max.map((error) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="latitude" className="mb-2 block text-sm font-medium">
                        Latitude
                    </label>
                    <input id="latitude" name="latitude" type="number" step="any" placeholder="Enter latitude" defaultValue={shop.latitude} className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="latitude-error" />
                    <div id="latitude-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.latitude &&
                            state.errors.latitude.map((error) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="longitude" className="mb-2 block text-sm font-medium">
                        Longitude
                    </label>
                    <input id="longitude" name="longitude" type="number" step="any" placeholder="Enter longitude" defaultValue={shop.longitude} className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="longitude-error" />
                    <div id="longitude-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.longitude &&
                            state.errors.longitude.map((error) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="opens" className="mb-2 block text-sm font-medium">
                        Jam Buka
                    </label>
                    <input id="opens" name="opens" type="time" defaultValue={shop.opens} className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="opens-error" />
                    <div id="opens-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.opens &&
                            state.errors.opens.map((error) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="closes" className="mb-2 block text-sm font-medium">
                        Jam Tutup
                    </label>
                    <input id="closes" name="closes" type="time" defaultValue={shop.closes} className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="closes-error" />
                    <div id="closes-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.closes &&
                            state.errors.closes.map((error) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="subdistrict" className="mb-2 block text-sm font-medium">
                        Kecamatan
                    </label>
                    <select id="subdistrict" name="subdistrict" defaultValue={shop.subdistrict} className="peer block w-full rounded-md bg-white border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="subdistrict-error">
                        <option value="">Pilih Kecamatan</option>
                        <option value="Batu Aji">Batu Aji</option>
                        <option value="Batu Ampar">Batu Ampar</option>
                    </select>
                    <div id="subdistrict-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.subdistrict &&
                            state.errors.subdistrict.map((error) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link href="/dashboard/shops" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                    Batal
                </Link>
                <Button className="disabled:bg-blue-300" type="submit" disabled={isPending}>{isPending ? <FaSpinner className="animate-spin"/> : "Simpan toko"}</Button>
            </div>
        </form>
    );
}
