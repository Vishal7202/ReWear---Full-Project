const categories = [
  {
    name: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    count: "1200+ items",
  },
  {
    name: "Hoodies",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    count: "850+ items",
  },
  {
    name: "Jackets",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
    count: "950+ items",
  },
  {
    name: "Jeans",
    image: "https://images.unsplash.com/photo-1583002865245-7d9c5d1a3c3e",
    count: "1100+ items",
  },
  {
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1520975922284-9b5f4f7f2c36",
    count: "1300+ items",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    count: "750+ items",
  },
];

const Categories = () => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Shop by Categories</h2>
        <button className="text-green-600 text-sm">View all</button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

        {categories.map((cat, index) => (
          <div
            key={index}
            className="text-center cursor-pointer group"
          >
            <img
              src={cat.image}
              className="w-full h-28 object-cover rounded-xl group-hover:scale-105 transition"
            />

            <h3 className="mt-2 font-medium text-sm">
              {cat.name}
            </h3>

            <p className="text-gray-500 text-xs">
              {cat.count}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Categories;