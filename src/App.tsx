import React, { useState } from 'react';
import axios from 'axios';
import { SearchBar } from './components/SearchBar';
import { ProductCard } from './components/ProductCard';
import { Search } from 'lucide-react';
import type { SearchResult } from './types';

function App() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          key: 'AIzaSyDhi0oE4mge_bgIdS1hEXPlPb3MhfvsTa0', // Replace with your actual API key
          cx: 'c28d8606996b94015',
          q: query,
          searchType: 'image',
          num: 10
        }
      });

      const items = response.data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        image: item.pagemap?.cse_image?.[0]?.src || item.link,
        price: item.pagemap?.offer?.[0]?.price
      }));

      setResults(items);
    } catch (err) {
      setError('Failed to fetch results. Please try again later.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wardrobe Search</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect clothing items across multiple stores
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
          <div className="text-center text-red-600 mb-8">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <ProductCard key={index} product={result} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-12">
            <Search size={48} className="mx-auto mb-4 text-gray-400" />
            <p>Enter a search term to find products</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;