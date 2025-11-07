// Application status options
export const STATUS_OPTIONS = [
  'Not Applied',
  'Emailed',
  'Applied',
  'Interviewed',
  'Passed',
  'Rejected'
];

// Industry type options
export const INDUSTRY_TYPES = [
  'Company',
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Marketing',
  'Design',
  'Data Science',
  'Engineering',
  'Consulting',
  'Retail',
  'Other'
];

// Status color mapping for UI
export const STATUS_COLORS = {
  'Not Applied': 'bg-gray-100 text-gray-700 border-gray-200',
  'Emailed': 'bg-blue-50 text-blue-700 border-blue-200',
  'Applied': 'bg-purple-50 text-purple-700 border-purple-200',
  'Interviewed': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Passed': 'bg-green-50 text-green-700 border-green-200',
  'Rejected': 'bg-red-50 text-red-700 border-red-200'
};

// Default point of contact structure
export const DEFAULT_CONTACT = {
  name: '',
  position: '',
  email: ''
};
