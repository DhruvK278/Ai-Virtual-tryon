"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";

interface ClothingItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  color: string;
  isNew?: boolean;
}

const clothingItems: ClothingItem[] = [
  {
    id: 1,
    name: "Check Shirt",
    price: 29.99,
    image: "/assets/Shirt 2.png",
    category: "tops",
    color: "brownish",
    isNew: true
  },
  {
    id: 2,
    name: "Classic Shirt",
    price: 89.99,
    image: "/assets/Shirt.png",
    category: "tops",
    color: "Black"
  },
  {
    id: 3,
    name: "Full Sleeves ",
    price: 69.99,
    image: "/assets/Full sleeves.png",
    category: "tops",
    color: "Grey"
  },
  {
    id: 4,
    name: "Pleated Skirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=1000",
    category: "bottoms",
    color: "Black"
  },
  {
    id: 5,
    name: "Summer Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000",
    category: "dresses",
    color: "Yellow",
    isNew: true
  },
  {
    id: 6,
    name: "Floral Maxi Dress",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1000",
    category: "dresses",
    color: "Multicolor"
  },
  {
    id: 7,
    name: "Leather Jacket",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000",
    category: "tops",
    color: "Black",
    isNew: true
  },
  {
    id: 8,
    name: "Silk Blouse",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=1000",
    category: "tops",
    color: "Pink"
  },
  {
    id: 9,
    name: "Cargo Pants",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000",
    category: "bottoms",
    color: "Khaki"
  },
  {
    id: 10,
    name: "Wide Leg Trousers",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1000",
    category: "bottoms",
    color: "Beige",
    isNew: true
  },
  {
    id: 11,
    name: "Cocktail Dress",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1000",
    category: "dresses",
    color: "Red"
  },
  {
    id: 12,
    name: "Wrap Dress",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000",
    category: "dresses",
    color: "Green"
  }
];

export default function ClothesSection() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const toggleCart = (id: number) => {
    setCart(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="py-16 px-2 bg-gray-50">
      <div className="max-w-8xl mx-auto">
      <span className="block h-1 w-100 bg-black my--1 mx-auto rounded"></span>
      <span className="block h-1 w-50 bg-black my-1 mx-auto rounded"></span>
        <div className="text-center mb-12">
          <h2 className="font-bourbon text-7xl font-bold mb-4">
            Our Collection
            <span className="block h-1 w-100 bg-black my--1 mx-auto rounded"></span>
            <span className="block h-1 w-50 bg-black my-1 mx-auto rounded"></span>
            </h2>
          <p className="text-black font-sans max-w-2xl mx-auto">
            Discover our carefully curated selection of fashion pieces, designed to help you express your unique style.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="sticky top-0 z-50 bg-white shadow-md rounded-full">
            <TabsList className="flex justify-center font-semibold mb-12 bg-black p-1 rounded-full border shadow-sm">
              <TabsTrigger value="all" className="px-8 py-3 rounded-full text-white">All</TabsTrigger>
              <TabsTrigger value="tops" className="px-8 py-3 rounded-full text-white">Tops</TabsTrigger>
              <TabsTrigger value="bottoms" className="px-8 py-3 rounded-full text-white">Bottoms</TabsTrigger>
              <TabsTrigger value="dresses" className="px-8 py-3 rounded-full text-white">Dresses</TabsTrigger>
            </TabsList>
          </div>

          {["all", "tops", "bottoms", "dresses"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {clothingItems
                  .filter(item => category === "all" || item.category === category)
                  .map(item => (
                    <Card key={item.id} className="overflow-hidden group bg-white hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[1]">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {item.isNew && (
                          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                            New
                          </div>
                        )}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className={`p-2 rounded-full ${
                              favorites.includes(item.id)
                                ? "bg-red-500 text-white"
                                : "bg-white/80 text-gray-700"
                            } hover:scale-110 transition-all duration-300 shadow-md`}
                          >
                            <Heart className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => toggleCart(item.id)}
                            className={`p-2 rounded-full ${
                              cart.includes(item.id)
                                ? "bg-black text-white"
                                : "bg-white/80 text-gray-700"
                            } hover:scale-110 transition-all duration-300 shadow-md`}
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500">{item.color}</p>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}