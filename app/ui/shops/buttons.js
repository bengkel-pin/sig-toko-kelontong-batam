"use client";
import { PencilIcon, PlusIcon, TrashIcon} from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { deleteShop } from "@/app/lib/actions";
import { useState } from "react";

export function CreateShop() {
    return (
        <Link href="/dashboard/shops/create" className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <span className="hidden md:block">Tambah Toko</span> <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateShop({ id }) {
    return (
        <Link href={`/dashboard/shops/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteShop({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Open the modal
    const openModal = () => setIsModalOpen(true);

    // Close the modal
    const closeModal = () => setIsModalOpen(false);

    // Perform the delete action
    const handleDelete = async () => {
        await deleteShop(id); // Assuming deleteShop is a function that deletes the shop
        closeModal(); // Close the modal after deletion
    };

    return (
        <>
            <button onClick={openModal} className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="flex bg-white rounded-lg p-6 shadow-lg max-w-72 w-full text-wrap items-center flex-col">
                        <div className="bg-red-200 rounded-full w-16 h-16 p-2 text-red-500 mb-4">
                            <ExclamationTriangleIcon />
                        </div>
                        <h2 className="text-lg font-medium mb-2">Hapus Toko</h2>
                        <p className="mb-4 text-center">Kamu akan menghapus toko ini. Apakah kamu yakin?</p>
                        <div className="flex justify-between w-full gap-2">
                            <button onClick={closeModal} className="flex-1 rounded-md bg-gray-200 p-2 hover:bg-gray-300">
                                Batal
                            </button>
                            <button onClick={handleDelete} className="flex-1 rounded-md bg-red-500 text-white p-2 hover:bg-red-600">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
