import { getRandomElement } from './names';

const COMPANIES = [
  'TechCorp Solutions', 'Apex Digital', 'Quantum Labs', 'NextWave Software', 'ByteCraft Innovations',
  'CloudPulse Systems', 'Vanguard Media', 'Echo Dynamics', 'Hyperion Tech', 'Starlight Data'
];

const JOB_TITLES = [
  'Software Engineer', 'Full Stack Developer', 'Frontend Architect', 'Backend Developer',
  'Product Manager', 'QA Automation Engineer', 'DevOps Specialist', 'UI/UX Designer', 'CTO'
];

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi'
];

const SHORT_TITLES = [
  'Alpha Project', 'Beta Phase', 'Custom Item', 'Sample Entry', 'Digital Unit',
  'Primary Task', 'Core Element', 'Standard Value', 'Draft Item', 'Active Record'
];

export function generateShortText(): string {
  return getRandomElement(SHORT_TITLES);
}

export function generateCompany(): string {
  return getRandomElement(COMPANIES);
}

export function generateJobTitle(): string {
  return getRandomElement(JOB_TITLES);
}

export function generateSentence(minWords = 6, maxWords = 12): string {
  const count = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(getRandomElement(LOREM_WORDS));
  }
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

export function generateParagraph(sentencesCount = 3): string {
  const sentences: string[] = [];
  for (let i = 0; i < sentencesCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(' ');
}

export function generatePassword(): string {
  const words = ['Dev', 'Code', 'Test', 'Speed', 'Secure', 'Pixel', 'Rocket', 'Ninja'];
  const symbols = ['!', '@', '#', '$', '%'];
  const word = getRandomElement(words);
  const num = Math.floor(Math.random() * 899) + 100;
  const sym = getRandomElement(symbols);
  return `${word}${num}${sym}`;
}

export function generateBirthdate(): string {
  const start = new Date(1985, 0, 1).getTime();
  const end = new Date(2004, 11, 31).getTime();
  const date = new Date(start + Math.random() * (end - start));
  return date.toISOString().split('T')[0];
}

export function generateFutureDate(): string {
  const start = new Date().getTime();
  const end = start + 365 * 24 * 60 * 60 * 1000;
  const date = new Date(start + Math.random() * (end - start));
  return date.toISOString().split('T')[0];
}

export function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateHexColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
