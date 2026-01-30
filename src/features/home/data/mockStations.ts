export interface GasStation {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  image?: string;
  description?: string;
  phone?: string;
  openHours?: string;
  lat?: number;
  lng?: number;
}

export const mockGasStations: GasStation[] = [
  {
    id: '1',
    name: 'Heagle Gasoline',
    rating: 4.5,
    reviewCount: 234,
    address: 'Asa Dam, Airport Road, Ilorin',
    description: 'Premium quality gasoline and diesel',
    phone: '(+234) 913-546-4740',
    openHours: '24/7',
    lat: 8.4606,
    lng: 4.5405,
  },
  {
    id: '2',
    name: 'Bovas Filling Station',
    rating: 4.2,
    reviewCount: 187,
    address: 'Ilorin Mall, Taiwo Rd, Offa Garage',
    description: 'Quality fuel and car services',
    phone: '(+234) 914-567-8901',
    openHours: '6:00 AM - 11:00 PM',
    lat: 8.4626,
    lng: 4.5403,
  },
  {
    id: '3',
    name: 'Shell V-Power',
    rating: 4.7,
    reviewCount: 312,
    address: 'Fate Road, Ilorin',
    description: 'Shell premium motor oil and fuels',
    phone: '(+234) 915-678-9012',
    openHours: '24/7',
    lat: 8.4706,
    lng: 4.5503,
  },
  {
    id: '4',
    name: 'Premium Fuel Point',
    rating: 4.1,
    reviewCount: 156,
    address: 'Garin Alimi, Ilorin',
    description: 'Affordable and reliable fuel supply',
    phone: '(+234) 916-789-0123',
    openHours: '5:00 AM - 10:00 PM',
    lat: 8.4556,
    lng: 4.5305,
  },
  {
    id: '5',
    name: 'Enyo Filling Station',
    rating: 4.4,
    reviewCount: 198,
    address: 'Taiwo Road, Ilorin',
    description: 'Modern fuel station with convenience store',
    phone: '(+234) 917-890-1234',
    openHours: '24/7',
    lat: 8.4646,
    lng: 4.5443,
  },
  {
    id: '6',
    name: 'TopTier Petroleum',
    rating: 4.3,
    reviewCount: 167,
    address: 'Offa Garage, Ilorin',
    description: 'Quality fuels at competitive prices',
    phone: '(+234) 918-901-2345',
    openHours: '6:00 AM - 9:30 PM',
    lat: 8.4506,
    lng: 4.5253,
  },
];

export const getStationById = (id: string): GasStation | undefined => {
  return mockGasStations.find((station) => station.id === id);
};

export const getNearbyStations = (limit = 5): GasStation[] => {
  return mockGasStations.slice(0, limit);
};

export const getTopDistributors = (limit = 3): GasStation[] => {
  return mockGasStations.sort((a, b) => b.rating - a.rating).slice(0, limit);
};

export const searchStations = (query: string): GasStation[] => {
  return mockGasStations.filter(
    (station) =>
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.address.toLowerCase().includes(query.toLowerCase())
  );
};
