export default function SubdistrictFilter({ selectedSubdistrict, handleSubdistrictChange }){
    return (
        <div className="mt-14 p-4">
            <p className="font-bold">Pilih Kecamatan</p>
            <select
                name="subdistrict"
                id="subdistrict-filter"
                className="border-[2px] w-full p-2 rounded outline-none mt-2 cursor-pointer"
                value={selectedSubdistrict}
                onChange={handleSubdistrictChange}
            >
                <option value="All">Semua</option>
                <option value="Batu Aji">Batu Aji</option>
                <option value="Batu Ampar">Batu Ampar</option>
            </select>
        </div>
    );
};
