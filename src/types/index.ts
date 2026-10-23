export type PresetLocale = 'global' | 'bangladesh';

export type FieldCategory =
  | 'first_name'
  | 'last_name'
  | 'full_name'
  | 'username'
  | 'email'
  | 'phone'
  | 'password'
  | 'confirm_password'
  | 'company'
  | 'job_title'
  | 'address'
  | 'city'
  | 'state'
  | 'zip'
  | 'country'
  | 'url'
  | 'date'
  | 'birthdate'
  | 'credit_card'
  | 'cvv'
  | 'color'
  | 'number'
  | 'price'
  | 'text'
  | 'long_text'
  | 'uuid';

export interface DevFillSettings {
  locale: PresetLocale;
  defaultPassword: string;
  useFixedPassword: boolean;
  emailDomain: string;
  highlightFields: boolean;
  fillHiddenFields: boolean;
}

export const DEFAULT_SETTINGS: DevFillSettings = {
  locale: 'global',
  defaultPassword: 'Password123!',
  useFixedPassword: true,
  emailDomain: 'example.com',
  highlightFields: true,
  fillHiddenFields: false
};

export type MessageType =
  | { type: 'FILL_ALL'; settings?: Partial<DevFillSettings> }
  | { type: 'CLEAR_ALL' }
  | { type: 'FILL_SINGLE'; category: FieldCategory; settings?: Partial<DevFillSettings> }
  | { type: 'GET_STATS' };

export interface FillResult {
  success: boolean;
  filledCount: number;
  durationMs: number;
}
