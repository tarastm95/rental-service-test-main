import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

interface ApartmentDetail {
  name: string;
  description: string;
  price: number | string;
  number_of_rooms: number;
  square: number | string;
  availability: boolean;
  owner: string;
}

export default function ApartmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [apt, setApt] = useState<ApartmentDetail | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/apartments/${slug}/`);
        setApt(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [slug]);

  if (!apt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{apt.name}</h1>
        <p className="text-gray-700 mb-6">{apt.description}</p>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Price:</span>
            <span className="text-gray-800">${apt.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Rooms:</span>
            <span className="text-gray-800">{apt.number_of_rooms}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Square:</span>
            <span className="text-gray-800">{apt.square} m²</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Owner:</span>
            <span className="text-gray-800">{apt.owner}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Status:</span>
            <span
              className={`${apt.availability ? "text-green-600" : "text-red-600"}`}
            >
              {apt.availability ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
