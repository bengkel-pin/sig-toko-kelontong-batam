const DeleteConfirmationModal = ({ showModal, onClose, onDelete, shopName }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                <h3 className="text-xl font-medium text-gray-800">Confirm Delete</h3>
                <p className="text-sm text-gray-600 mt-2">Are you sure you want to delete the shop <strong>{shopName}</strong>?</p>
                <div className="mt-4 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
                    <button
                        onClick={() => {
                            onDelete();
                            onClose();
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;