import { PresetLocale } from '../types';
import { generateFirstName, generateLastName, getRandomElement } from './names';

const BD_OPERATOR_PREFIXES = ['017', '013', '018', '019', '014', '016', '015'];

const BD_CITIES = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Comilla', 'Mymensingh', 'Cox\'s Bazar'
];

const BD_AREAS = [
  'Gulshan', 'Banani', 'Dhanmondi', 'Uttara', 'Mirpur', 'Mohakhali', 'Bashundhara', 'Motijheel', 'Agrabad', 'Nasirabad'
];

const GLOBAL_CITIES = [
  'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Toronto', 'Sydney', 'Paris', 'Amsterdam', 'Singapore'
];

const GLOBAL_STREETS = [
  'Oak Street', 'Maple Avenue', 'Cedar Lane', 'Pine Road', 'Elm Boulevard', 'Market Street', 'Main Street', 'Highland Park'
];

export function generateEmail(locale: PresetLocale, customDomain?: string): string {
  const first = generateFirstName(locale).toLowerCase().replace(/[^a-z]/g, '');
  const last = generateLastName(locale).toLowerCase().replace(/[^a-z]/g, '');
  const num = Math.floor(Math.random() * 90) + 10;
  const domain = customDomain && customDomain.trim() ? customDomain.replace(/^@/, '') : 'example.com';
  return `${first}.${last}${num}@${domain}`;
}

export function generatePhone(locale: PresetLocale): string {
  if (locale === 'bangladesh') {
    const prefix = getRandomElement(BD_OPERATOR_PREFIXES);
    const suffix = Math.floor(Math.random() * 90000000) + 10000000;
    return `+88${prefix}${suffix.toString().slice(0, 8)}`;
  }

  // Global / US standard format: +1 (555) 000-0000
  const areaCode = Math.floor(Math.random() * 800) + 200;
  const central = Math.floor(Math.random() * 900) + 100;
  const line = Math.floor(Math.random() * 9000) + 1000;
  return `+1 (${areaCode}) ${central}-${line}`;
}

export function generateAddress(locale: PresetLocale): {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
} {
  if (locale === 'bangladesh') {
    const house = Math.floor(Math.random() * 120) + 1;
    const road = Math.floor(Math.random() * 30) + 1;
    const area = getRandomElement(BD_AREAS);
    const city = getRandomElement(BD_CITIES);
    const zip = (Math.floor(Math.random() * 8000) + 1000).toString();
    return {
      street: `House ${house}, Road ${road}, ${area}`,
      city,
      state: city,
      zip,
      country: 'Bangladesh'
    };
  }

  const streetNum = Math.floor(Math.random() * 900) + 100;
  const streetName = getRandomElement(GLOBAL_STREETS);
  const city = getRandomElement(GLOBAL_CITIES);
  const zip = (Math.floor(Math.random() * 89999) + 10000).toString();
  return {
    street: `${streetNum} ${streetName}`,
    city,
    state: 'CA',
    zip,
    country: 'United States'
  };
}
