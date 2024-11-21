"use client";

import Link from "next/link";
import { XMarkIcon, BuildingStorefrontIcon, ArrowDownRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createShop } from "@/app/lib/actions";
import { useActionState } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { startTransition } from "react";

const initialState = { message: null, errors: {} };
export default function Form() {
    const [state, formAction] = useActionState(createShop, initialState);

    const [images, setImages] = useState([]);

    const onDrop = (acceptedFiles) => {
        if (images.length + acceptedFiles.length > 3) {
            alert("You can only upload up to 3 images.");
            return;
        }
        setImages((prevImages) => [...prevImages, ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 3,
    });

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        // Append images to FormData
        images.forEach((image) => {
            formData.append("images", image);
        });

        startTransition(() => {
            formAction(formData); // This triggers the async createShop function
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Image Upload (Drag And Drop) */}
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">Gambar Toko (Max 3)</label>
                    <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer">
                        <input {...getInputProps()} />
                        <p>Drag & drop images here, or click to select files</p>
                    </div>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                        {images.map((file, index) => (
                            <div key={file.name} className="relative flex justify-center items-center rounded-md w-full">
                                <input
                                    id={`image_${index}`}
                                    type="radio"
                                    name="default_image"
                                    value={file.name}
                                    className="mt-1 hidden peer"
                                    defaultChecked={index === 0} // set first image as default
                                />
                                <label className="peer relative peer-checked:border-blue-600 peer-checked:border-2 rounded-md cursor-pointer w-full" htmlFor={`image_${index}`}>
                                    <img src={file.preview} alt="preview" className="w-full aspect-square object-cover rounded-md" />
                                </label>
                                <span className="absolute left-0 top-0 bg-blue-600 text-white p-2 rounded-br-md rounded-tl-md hidden peer-checked:block">Default</span>
                                <button type="button" className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white p-1 h-6 w-6 rounded-bl-md rounded-tr-md" onClick={() => removeImage(index)}>
                                    <XMarkIcon />
                                </button>
                            </div>
                        ))}
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
                            <input id="name" name="name" type="text" placeholder="Enter shop name" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" aria-describedby="name-error" />
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
                            <input id="price_min" name="price_min" type="number" step="0.01" placeholder="Enter minimum price" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" aria-describedby="price_min-error" />
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
                            <input id="price_max" name="price_max" type="number" step="0.01" placeholder="Enter maximum price" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" aria-describedby="price_max-error" />
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
                    <input id="latitude" name="latitude" type="number" step="0.000001" placeholder="Enter latitude" className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="latitude-error" />
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
                    <input id="longitude" name="longitude" type="number" step="0.000001" placeholder="Enter longitude" className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="longitude-error" />
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
                    <input id="opens" name="opens" type="time" className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="opens-error" />
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
                    <input id="closes" name="closes" type="time" className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="closes-error" />
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
                    <input id="subdistrict" name="subdistrict" type="text" placeholder="Enter subdistrict" className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" aria-describedby="subdistrict-error" />
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
                <Button type="submit">Tambah Toko</Button>
            </div>
        </form>
    );
}
