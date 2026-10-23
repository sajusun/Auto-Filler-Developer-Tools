import { DevFillSettings, FieldCategory } from '../types';
import { generateFirstName, generateLastName, generateFullName, generateUsername } from './names';
import { generateEmail, generatePhone, generateAddress } from './contacts';
import {
  generateCompany,
  generateJobTitle,
  generateParagraph,
  generatePassword,
  generateBirthdate,
  generateFutureDate,
  generateUuid,
  generateHexColor,
  generateShortText
} from './words';

export class DevFillGenerator {
  private settings: DevFillSettings;
  private sessionPassword: string | null = null;

  constructor(settings: DevFillSettings) {
    this.settings = settings;
  }

  public updateSettings(settings: Partial<DevFillSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }

  public getSessionPassword(): string {
    if (this.settings.useFixedPassword) {
      return this.settings.defaultPassword || 'Password123!';
    }
    if (!this.sessionPassword) {
      this.sessionPassword = generatePassword();
    }
    return this.sessionPassword;
  }

  public resetSession(): void {
    this.sessionPassword = null;
  }

  public generate(category: FieldCategory): string {
    const locale = this.settings.locale;

    switch (category) {
      case 'first_name':
        return generateFirstName(locale);
      case 'last_name':
        return generateLastName(locale);
      case 'full_name':
        return generateFullName(locale);
      case 'username':
        return generateUsername(locale);
      case 'email':
        return generateEmail(locale, this.settings.emailDomain);
      case 'phone':
        return generatePhone(locale);
      case 'password':
      case 'confirm_password':
        return this.getSessionPassword();
      case 'company':
        return generateCompany();
      case 'job_title':
        return generateJobTitle();
      case 'address':
        return generateAddress(locale).street;
      case 'city':
        return generateAddress(locale).city;
      case 'state':
        return generateAddress(locale).state;
      case 'zip':
        return generateAddress(locale).zip;
      case 'country':
        return generateAddress(locale).country;
      case 'url':
        return `https://${generateUsername(locale)}.dev`;
      case 'birthdate':
        return generateBirthdate();
      case 'date':
        return generateFutureDate();
      case 'credit_card':
        // Test Visa number (standard 4111...)
        return '4111111111111111';
      case 'cvv':
        return (Math.floor(Math.random() * 899) + 100).toString();
      case 'color':
        return generateHexColor();
      case 'number':
        return (Math.floor(Math.random() * 100) + 1).toString();
      case 'price':
        return (Math.floor(Math.random() * 950) + 50).toString();
      case 'text':
        return generateShortText();
      case 'long_text':
        return generateParagraph(2);
      case 'uuid':
        return generateUuid();
      default:
        return generateShortText();
    }
  }
}
