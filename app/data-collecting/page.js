export default function Page() {
    return (
        <>
            <div className="border-b border-slate-400 w-full h-[54px] flex items-center px-4 md:px-40">
                <div className="w-full">Tentang Data</div>
            </div>

            <div className="flex px-4 md:px-40 py-4 md:py-20">
                <div className="border border-black rounded-md p-4 md:p-20 text-justify">
                    <h1 className="text-[32px] mb-4">Bagaimana kami mendapatkan data untuk peta kami?</h1>
                    <p className="font-light mb-8">
                        Kami menjelajahi area dan mencari toko kelontong di sepanjang perjalanan. Jika menemukan toko yang sesuai, kami berhenti, masuk, dan mewawancarai pemilik atau pengelola untuk mengumpulkan data yang diperlukan. Proses ini memastikan informasi yang kami kumpulkan langsung dari
                        sumbernya.
                    </p>

                    <h1 className="text-[32px] mb-4">Bagaimana kami menggunakan data ini?</h1>
                    <p className="font-light">
                        Data ini kami olah untuk membangun peta interaktif. Misalnya, informasi tentang nama toko, rentang harga produk, lokasi geografis, hingga jam operasional ditampilkan langsung di peta. Ini memungkinkan pengguna untuk dengan mudah
                        menemukan toko sesuai kebutuhan mereka. Selain itu, data gambar toko menambah nilai visual yang membantu pengguna mengenali tempat saat tiba di lokasi. Semua informasi ini diintegrasikan secara dinamis ke dalam Maplibre,
                        memberikan pengalaman eksplorasi yang mudah.
                    </p>
                </div>
            </div>
        </>
    );
}
