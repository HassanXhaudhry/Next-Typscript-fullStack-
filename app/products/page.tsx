// app/components/ProductsDashboard.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProducts } from "@/lib/fetchProducts";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../searchBar/page";
import { RootState } from "@/lib/redux/store";
import { addToCart } from "@/lib/redux/cartSlice";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

const ProductsDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch();

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    getProducts();
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products Dashboard</h2>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-lg">
            <div className="relative w-full h-40">
              <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
                priority
              />
            </div>
            <h3 className="text-md font-semibold my-2">{product.title}</h3>
            <p className="text-[8px]">{product.description}</p>
            <p className="text-gray-700 py-2 text-sm font-bold">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product.id))}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsDashboard;