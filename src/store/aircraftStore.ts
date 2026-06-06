import { create } from 'zustand';
import type { Aircraft, Generation } from '@/types';
import { aircraftData } from '@/data/aircraftData';

interface AircraftStore {
  allAircraft: Aircraft[];
  filteredAircraft: Aircraft[];
  searchQuery: string;
  selectedGeneration: Generation | null;
  setSearchQuery: (query: string) => void;
  setSelectedGeneration: (generation: Generation | null) => void;
  filterAircraft: () => void;
  getAircraftById: (id: string) => Aircraft | undefined;
}

export const useAircraftStore = create<AircraftStore>((set, get) => ({
  allAircraft: aircraftData,
  filteredAircraft: aircraftData,
  searchQuery: '',
  selectedGeneration: null,
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().filterAircraft();
  },
  setSelectedGeneration: (generation: Generation | null) => {
    set({ selectedGeneration: generation });
    get().filterAircraft();
  },
  filterAircraft: () => {
    const { allAircraft, searchQuery, selectedGeneration } = get();
    let result = allAircraft;

    if (selectedGeneration) {
      result = result.filter(a => a.generation === selectedGeneration);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        a =>
          a.name.toLowerCase().includes(query) ||
          a.nameEn.toLowerCase().includes(query) ||
          a.country.toLowerCase().includes(query) ||
          a.manufacturer.toLowerCase().includes(query)
      );
    }

    set({ filteredAircraft: result });
  },
  getAircraftById: (id: string) => {
    return get().allAircraft.find(a => a.id === id);
  },
}));
