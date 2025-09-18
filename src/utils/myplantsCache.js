// Utility for caching MyPlants data in localStorage

const CACHE_KEY = 'leaflens_myplants';

export function saveMyPlants(plants) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(plants));
}

export function getMyPlants() {
  const cached = localStorage.getItem(CACHE_KEY);
  return cached ? JSON.parse(cached) : [];
}

export function addPlant(plant) {
  const plants = getMyPlants();
  plants.push(plant);
  saveMyPlants(plants);
}

export function removePlant(id) {
  let plants = getMyPlants();
  plants = plants.filter(p => p.id !== id);
  saveMyPlants(plants);
}
