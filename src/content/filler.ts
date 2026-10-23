import { DevFillGenerator } from '../generator';
import { DevFillSettings, FieldCategory } from '../types';
import { detectFieldCategory } from './detector';

export class DevFillDomEngine {
  private generator: DevFillGenerator;
  private settings: DevFillSettings;

  constructor(settings: DevFillSettings) {
    this.settings = settings;
    this.generator = new DevFillGenerator(settings);
  }

  public updateSettings(settings: Partial<DevFillSettings>): void {
    this.settings = { ...this.settings, ...settings };
    this.generator.updateSettings(this.settings);
  }

  /**
   * Fills all eligible form inputs on the current page
   */
  public fillAll(): number {
    this.generator.resetSession();
    let filledCount = 0;

    // Collect all candidate elements
    const elements = Array.from(
      document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input, textarea, select'
      )
    );

    const radioGroupsHandled = new Set<string>();

    for (const el of elements) {
      if (!this.isFillable(el)) continue;

      if (el instanceof HTMLInputElement && el.type === 'radio') {
        const name = el.name;
        if (name && radioGroupsHandled.has(name)) continue;
        if (name) radioGroupsHandled.add(name);
        this.fillRadioGroup(name);
        filledCount++;
        continue;
      }

      const success = this.fillElement(el);
      if (success) filledCount++;
    }

    return filledCount;
  }

  /**
   * Fills a single specific element with a targeted category or auto-detected category
   */
  public fillElement(
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    forceCategory?: FieldCategory
  ): boolean {
    if (!this.isFillable(element)) return false;

    // Handle Select dropdowns
    if (element instanceof HTMLSelectElement) {
      return this.fillSelect(element);
    }

    // Handle Checkboxes
    if (element instanceof HTMLInputElement && element.type === 'checkbox') {
      return this.fillCheckbox(element);
    }

    // Handle Text-like inputs & Textarea
    const category = forceCategory || detectFieldCategory(element);
    const value = this.generator.generate(category);

    this.setReactiveValue(element, value);

    if (this.settings.highlightFields) {
      this.highlightElement(element);
    }

    return true;
  }

  /**
   * Clears values of all form inputs on the page
   */
  public clearAll(): number {
    let clearedCount = 0;
    const elements = Array.from(
      document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input, textarea, select'
      )
    );

    for (const el of elements) {
      if (!this.isFillable(el)) continue;

      if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
        el.checked = false;
        this.dispatchEvents(el);
        clearedCount++;
      } else if (el instanceof HTMLSelectElement) {
        el.selectedIndex = 0;
        this.dispatchEvents(el);
        clearedCount++;
      } else {
        this.setReactiveValue(el, '');
        clearedCount++;
      }
    }

    return clearedCount;
  }

  private isFillable(el: HTMLElement): boolean {
    if (el instanceof HTMLInputElement) {
      const type = el.type.toLowerCase();
      // Skip buttons, submits, hidden, file, and images
      if (['submit', 'button', 'reset', 'hidden', 'image', 'file'].includes(type)) {
        return false;
      }
    }

    // Check disabled / readonly
    if ((el as HTMLInputElement).disabled || (el as HTMLInputElement).readOnly) {
      return false;
    }

    // Check visibility if not explicitly allowing hidden
    if (!this.settings.fillHiddenFields) {
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        return false;
      }
      if (el.offsetWidth === 0 && el.offsetHeight === 0 && !el.getClientRects().length) {
        return false;
      }
    }

    return true;
  }

  /**
   * Sets value with React/Vue prototype setter hook and dispatches synthetic events
   */
  private setReactiveValue(
    element: HTMLInputElement | HTMLTextAreaElement,
    value: string
  ): void {
    const prototype = element instanceof HTMLInputElement
      ? window.HTMLInputElement.prototype
      : window.HTMLTextAreaElement.prototype;

    const valueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

    if (valueSetter) {
      valueSetter.call(element, value);
    } else {
      element.value = value;
    }

    this.dispatchEvents(element);
  }

  private fillSelect(select: HTMLSelectElement): boolean {
    const options = Array.from(select.options).filter(
      (opt) => opt.value !== '' && !opt.disabled
    );

    if (options.length === 0) return false;

    const chosen = options[Math.floor(Math.random() * options.length)];
    select.value = chosen.value;
    this.dispatchEvents(select);

    if (this.settings.highlightFields) {
      this.highlightElement(select);
    }
    return true;
  }

  private fillCheckbox(checkbox: HTMLInputElement): boolean {
    checkbox.checked = true;
    this.dispatchEvents(checkbox);
    if (this.settings.highlightFields) {
      this.highlightElement(checkbox);
    }
    return true;
  }

  private fillRadioGroup(groupName: string): void {
    const radios = Array.from(
      document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${CSS.escape(groupName)}"]`)
    ).filter((r) => !r.disabled);

    if (radios.length > 0) {
      const chosen = radios[Math.floor(Math.random() * radios.length)];
      chosen.checked = true;
      this.dispatchEvents(chosen);
      if (this.settings.highlightFields) {
        this.highlightElement(chosen);
      }
    }
  }

  private dispatchEvents(element: HTMLElement): void {
    element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    element.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
  }

  private highlightElement(element: HTMLElement): void {
    const originalTransition = element.style.transition;
    const originalBoxShadow = element.style.boxShadow;
    const originalBorderColor = element.style.borderColor;

    element.style.transition = 'all 0.3s ease';
    element.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.4)';
    element.style.borderColor = '#10b981';

    setTimeout(() => {
      element.style.boxShadow = originalBoxShadow;
      element.style.borderColor = originalBorderColor;
      setTimeout(() => {
        element.style.transition = originalTransition;
      }, 300);
    }, 900);
  }
}
