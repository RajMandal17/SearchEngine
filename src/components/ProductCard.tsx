import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { SearchResult } from '../types';

interface ProductCardProps {
  product: SearchResult;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {product.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500';
            }}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{product.title}</h3>
        {product.price && (
          <p className="text-green-600 font-bold mb-2">{product.price}</p>
        )}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{product.snippet}</p>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          View Product
          <ExternalLink size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
}