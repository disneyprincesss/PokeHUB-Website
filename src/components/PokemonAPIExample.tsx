import React, { useState, useEffect } from 'react';
import { apiService, Pokemon } from '../services/api';

const PokemonAPIExample: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getPokemon({ limit: 10 });
      setPokemon(response.data);
    } catch (err) {
      setError('Failed to fetch Pokemon data');
      console.error('Error fetching Pokemon:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = async () => {
    if (!searchTerm.trim()) {
      fetchPokemon();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await apiService.searchPokemon(searchTerm);
      setPokemon(response.data);
    } catch (err) {
      setError('Failed to search Pokemon');
      console.error('Error searching Pokemon:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPokemon();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pokemon API Example</h2>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Pokemon by name..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button
          type="button"
          onClick={fetchPokemon}
          disabled={loading}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Reset
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading Pokemon...</p>
        </div>
      )}

      {/* Pokemon Grid */}
      {!loading && pokemon.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pokemon.map((poke) => (
            <div key={poke.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <img
                  src={poke.image}
                  alt={poke.name}
                  className="w-24 h-24 mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold capitalize">{poke.name}</h3>
                <div className="flex justify-center gap-1 mb-2">
                  {poke.type.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full capitalize"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>HP: {poke.hp}</div>
                  <div>Attack: {poke.attack}</div>
                  <div>Defense: {poke.defense}</div>
                  <div>Speed: {poke.speed}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && pokemon.length === 0 && !error && (
        <div className="text-center py-8 text-gray-600">
          <p>No Pokemon found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default PokemonAPIExample;

