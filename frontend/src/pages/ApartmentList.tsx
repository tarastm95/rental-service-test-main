import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

interface Apartment {
  name: string;
  slug: string;
  price: number | string;
  number_of_rooms: number;
  availability: boolean;
}

interface PaginatedResponse {
  results: Apartment[];
  count: number;
}

export default function ApartmentList() {
  const [items, setItems] = useState<Apartment[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [available, setAvailable] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    price_min: "",
    price_max: "",
    rooms: "",
    available: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<PaginatedResponse | Apartment[]>(
          "/apartments/",
          {
            params: { page, ...appliedFilters },
          },
        );

        if (Array.isArray(data)) {
          setItems(data);
          setCount(data.length);
        } else {
          setItems(data.results ?? []);
          setCount(data.count ?? 0);
        }
      } catch (err) {
        console.error("Failed to fetch apartments:", err);
        setItems([]);
        setCount(0);
      }
    })();
  }, [page, appliedFilters]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setAppliedFilters({
      search: searchTerm,
      price_min: minPrice,
      price_max: maxPrice,
      rooms,
      available,
    });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setRooms("");
    setAvailable("");
    setPage(1);
    setAppliedFilters({
      search: "",
      price_min: "",
      price_max: "",
      rooms: "",
      available: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={handleFilterSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="col-span-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-400 focus:ring-2"
          />

          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-400 focus:ring-2"
          />

          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-400 focus:ring-2"
          />

          <input
            type="number"
            placeholder="Rooms"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-400 focus:ring-2"
          />

          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-400 focus:ring-2"
          >
            <option value="">Any availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>

          <button
            type="submit"
            className="lg:col-span-5 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="lg:col-span-5 px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Reset Filters
          </button>
        </form>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <Link
              key={a.slug}
              to={`/apartments/${a.slug}`}
              className={`
                block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden
                ${!a.availability ? "opacity-60 grayscale" : ""}
              `}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {a.name}
                </h3>
                <p className="text-gray-600 mb-4">Price: ${a.price}</p>
                <p className="text-gray-600">Rooms: {a.number_of_rooms}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination page={page} count={count} onChange={setPage} />
        </div>
      </main>
    </div>
  );
}
