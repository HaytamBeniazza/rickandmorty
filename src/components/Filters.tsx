import React from 'react';
import { Search } from 'lucide-react';
import { CharacterFilters } from '../types';

interface FiltersProps {
  filters: CharacterFilters;
  onFilterChange: (filters: CharacterFilters) => void;
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Search characters..."
            className="input-field pl-10"
          />
        </div>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          name="species"
          value={filters.species}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">All Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="humanoid">Humanoid</option>
          <option value="robot">Robot</option>
        </select>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>
  );
}