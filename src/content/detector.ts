import { FieldCategory } from '../types';

interface Rule {
  category: FieldCategory;
  pattern: RegExp;
}

const RULES: Rule[] = [
  // Confirm Password (must check before generic password)
  { category: 'confirm_password', pattern: /(confirm|retype|repeat|again).*pass|pass.*(confirm|match)/i },
  // Password
  { category: 'password', pattern: /\b(pass(word)?|pwd|pin|secret)\b/i },

  // Email
  { category: 'email', pattern: /\b(e[-_ ]?mail)\b/i },

  // Phone
  { category: 'phone', pattern: /\b(phone|mobile|cell|tel(ephone)?|contact[-_ ]?no|whatsapp)\b/i },

  // Names (Crucial: match first and last before generic full_name or name)
  { category: 'first_name', pattern: /\b(first[-_ ]?name|fname|given[-_ ]?name|forename)\b/i },
  { category: 'last_name', pattern: /\b(last[-_ ]?name|lname|surname|family[-_ ]?name)\b/i },
  { category: 'full_name', pattern: /\b(full[-_ ]?name|your[-_ ]?name|display[-_ ]?name|^name$|\bname\b)/i },
  { category: 'username', pattern: /\b(user[-_ ]?name|login|nick(name)?|handle)\b/i },

  // Contact / Address
  { category: 'zip', pattern: /\b(zip|postal|pincode|postcode)\b/i },
  { category: 'city', pattern: /\b(city|town|district)\b/i },
  { category: 'state', pattern: /\b(state|province|region|division)\b/i },
  { category: 'country', pattern: /\b(country|nation)\b/i },
  { category: 'address', pattern: /\b(address|street|addr|location|residence)\b/i },

  // Business & Career
  { category: 'company', pattern: /\b(company|organization|org|business|employer|agency)\b/i },
  { category: 'job_title', pattern: /\b(job|title|role|designation|profession|position)\b/i },

  // Dates
  { category: 'birthdate', pattern: /\b(birth|dob|born)\b/i },
  { category: 'date', pattern: /\b(date|calendar|deadline|schedule|expiry|expires)\b/i },

  // Financial / Card
  { category: 'credit_card', pattern: /\b(card[-_ ]?num|credit|debit|cc[-_ ]?num|pan)\b/i },
  { category: 'cvv', pattern: /\b(cvv|cvc|security[-_ ]?code)\b/i },

  // Web & Tech
  { category: 'url', pattern: /\b(url|website|link|homepage|domain|portfolio|github|linkedin)\b/i },
  { category: 'uuid', pattern: /\b(uuid|guid|api[-_ ]?key|token)\b/i },

  // Numeric
  { category: 'price', pattern: /\b(price|salary|amount|cost|fee|budget)\b/i },
  { category: 'number', pattern: /\b(age|qty|quantity|count|num|years)\b/i },

  // Messages & Texts
  { category: 'long_text', pattern: /\b(bio|desc(ription)?|about|summary|comment|message|body|note|remark)\b/i }
];

export function detectFieldCategory(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): FieldCategory {
  const type = element instanceof HTMLInputElement ? element.type.toLowerCase() : '';

  // Direct HTML5 types
  if (type === 'email') return 'email';
  if (type === 'tel') return 'phone';
  if (type === 'password') {
    // Check if it's a confirmation field
    const attrText = extractElementMetadata(element);
    if (/(confirm|retype|repeat|again)/i.test(attrText)) {
      return 'confirm_password';
    }
    return 'password';
  }
  if (type === 'url') return 'url';
  if (type === 'color') return 'color';
  if (type === 'date' || type === 'datetime-local') return 'date';
  if (type === 'number') {
    const meta = extractElementMetadata(element);
    if (/price|amount|cost|fee|salary/i.test(meta)) return 'price';
    return 'number';
  }

  // If textarea, default to long text unless specific keywords match
  if (element instanceof HTMLTextAreaElement) {
    const meta = extractElementMetadata(element);
    if (/address/i.test(meta)) return 'address';
    return 'long_text';
  }

  // For text inputs and selects, run rules against combined metadata
  const metaString = extractElementMetadata(element);
  for (const rule of RULES) {
    if (rule.pattern.test(metaString)) {
      return rule.category;
    }
  }

  return 'text';
}

function extractElementMetadata(element: HTMLElement): string {
  const parts: string[] = [];

  // Check ID, Name, Placeholder, Autocomplete, Aria-label, Test-id
  const id = element.getAttribute('id') || '';
  const name = element.getAttribute('name') || '';
  const placeholder = element.getAttribute('placeholder') || '';
  const autocomplete = element.getAttribute('autocomplete') || '';
  const ariaLabel = element.getAttribute('aria-label') || '';
  const dataTestId = element.getAttribute('data-testid') || element.getAttribute('data-test') || '';

  parts.push(id, name, placeholder, autocomplete, ariaLabel, dataTestId);

  // Check associated <label>
  if (id) {
    const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
    if (label && label.textContent) {
      parts.push(label.textContent.trim());
    }
  }

  // Check parent <label>
  const parentLabel = element.closest('label');
  if (parentLabel && parentLabel.textContent) {
    parts.push(parentLabel.textContent.trim());
  }

  return parts.filter(Boolean).join(' ').toLowerCase();
}
