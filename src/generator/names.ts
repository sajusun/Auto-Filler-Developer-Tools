import { PresetLocale } from '../types';

const GLOBAL_FIRST_NAMES = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Sam', 'Chris', 'Casey', 'Robin', 'Pat', 'Jamie',
  'Liam', 'Noah', 'Oliver', 'James', 'Elijah', 'William', 'Henry', 'Lucas', 'Benjamin', 'Theodore',
  'Emma', 'Olivia', 'Charlotte', 'Amelia', 'Sophia', 'Isabella', 'Ava', 'Mia', 'Evelyn', 'Harper'
];

const GLOBAL_LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
];

const BD_FIRST_NAMES = [
  'Sakhawat', 'Tanvir', 'Rahim', 'Karim', 'Arif', 'Mahmud', 'Nayeem', 'Fahim', 'Shakib', 'Tamim',
  'Mashrafe', 'Hasan', 'Imran', 'Rashid', 'Saiful', 'Jamil', 'Zubair', 'Shahid', 'Rony', 'Anik',
  'Fatema', 'Ayesha', 'Nusrat', 'Sadia', 'Farhana', 'Ritu', 'Mim', 'Tasnim', 'Sultana', 'Jannat'
];

const BD_LAST_NAMES = [
  'Hossain', 'Ahmed', 'Rahman', 'Chowdhury', 'Islam', 'Khan', 'Ali', 'Uddin', 'Sarker', 'Bhuiyan',
  'Haque', 'Talukder', 'Mia', 'Sikder', 'Mondal', 'Kazi', 'Akter', 'Begum', 'Hasan', 'Mahmud'
];

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateFirstName(locale: PresetLocale): string {
  return locale === 'bangladesh'
    ? getRandomElement(BD_FIRST_NAMES)
    : getRandomElement(GLOBAL_FIRST_NAMES);
}

export function generateLastName(locale: PresetLocale): string {
  return locale === 'bangladesh'
    ? getRandomElement(BD_LAST_NAMES)
    : getRandomElement(GLOBAL_LAST_NAMES);
}

export function generateFullName(locale: PresetLocale): string {
  return `${generateFirstName(locale)} ${generateLastName(locale)}`;
}

export function generateUsername(locale: PresetLocale): string {
  const first = generateFirstName(locale).toLowerCase().replace(/[^a-z]/g, '');
  const num = Math.floor(Math.random() * 899) + 100;
  return `${first}${num}`;
}
