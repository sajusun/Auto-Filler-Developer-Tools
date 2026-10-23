import { FieldCategory } from '../types';

interface Rule {
  category: FieldCategory;
  pattern: RegExp;
}

const RULES: Rule[] = [
  // Confirm Password (must check before generic password)
  { category: 'confirm_password', pattern: /(confirm|retype|repeat|again).*pass|pass.*(confirm|match)/i },
  // Password
  { category: 'password', pattern: /pass(word)?|pwd|pin|secret/i },

  // Email
  { category: 'email', pattern: /e[-_]?mail/i },

  // Phone
  { category: 'phone', pattern: /phone|mobile|cell|tel(ephone)?|contact[-_]?no|whatsapp/i },

  // Names
  { category: 'first_name', pattern: /^(first[-_]?name|fname|given[-_]?name)$/i },
  { category: 'last_name', pattern: /^(last[-_]?name|lname|surname|family[-_]?name)$/i },
  { category: 'full_name', pattern: /(full[-_]?name|your[-_]?name|display[-_]?name|^name$)/i },
  { category: 'username', pattern: /user[-_]?name|login|nick(name)?|handle/i },

  // Contact / Address
  { category: 'zip', pattern: /zip|postal|pincode|postcode/i },
  { category: 'city', pattern: /city|town|district/i },
  { category: 'state', pattern: /state|province|region|division/i },
  { category: 'country', pattern: /country|nation/i },
  { category: 'address', pattern: /address|street|addr|location|residence/i },

  // Business & Career
  { category: 'company', pattern: /company|organization|org|business|employer|agency/i },
  { category: 'job_title', pattern: /job|title|role|designation|profession|position/i },

  // Dates
  { category: 'birthdate', pattern: /birth|dob|born/i },
  { category: 'date', pattern: /date|calendar|deadline|schedule|expiry|expires/i },

  // Financial / Card
  { category: 'credit_card', pattern: /card[-_]?num|credit|debit|cc[-_]?num|pan/i },
  { category: 'cvv', pattern: /cvv|cvc|security[-_]?code/i },

  // Web & Tech
  { category: 'url', pattern: /url|website|link|homepage|domain|portfolio|github|linkedin/i },
  { category: 'uuid', pattern: /uuid|guid|api[-_]?key|token/i },

  // Numeric
  { category: 'price', pattern: /price|salary|amount|cost|fee|budget/i },
  { category: 'number', pattern: /age|qty|quantity|count|num|years/i },

  // Messages & Texts
  { category: 'long_text', pattern: /bio|desc(ription)?|about|summary|comment|message|body|note|remark/i }
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
