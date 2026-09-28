// Edit this file to change site-wide text, contact details and the menu.
export const SITE = {
  name: 'Adnyan Foundation',
  legal: 'Adnyan Research & Educational Trust',
  tagline: 'Awaken of literacy',
  email: 'trustadnyan9@gmail.com',
  phone: '+91 99303 48149',
  phoneRaw: '+919930348149',
  address: '4, Venu Appt, B.J. Devrukhkar Rd, Dadar East, Mumbai - 400 014, Maharashtra, India',
  web: 'www.Adnyan.Org',
  social: {
    x: '#',
    facebook: '#',
    linkedin: '#',
    youtube: '#',
    instagram: '#',
  },
}

export const BANK = {
  accountName: 'Adnyan Research & Educational Trust',
  bank: 'IDBI Bank',
  account: '454104000007047',
  ifsc: 'IBKL0000454',
  branch: 'Dadar Branch, Mumbai',
  micr: '400259039',
  upi: '1000230318000087.9930348149@idbi',
}

export interface NavChild { label: string; to: string }
export interface NavItem { label: string; to?: string; children?: NavChild[] }

export const NAV: NavItem[] = [
  {
    label: 'About Us',
    children: [
      { label: 'Profile', to: '/profile' },
      { label: 'Governance', to: '/governance' },
      { label: 'Team', to: '/our-team' },
      { label: 'Awards', to: '/awards' },
    ],
  },
  {
    label: 'Projects',
    children: [
      { label: 'Ongoing Projects', to: '/current-projects' },
      { label: 'Previous Projects', to: '/previous-projects' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Books', to: '/resources/books' },
      { label: 'Reports and Studies', to: '/resources/reports' },
      { label: 'Manuals and Guidebooks', to: '/resources/manuals' },
      { label: 'Charters and White Papers', to: '/resources/charters' },
      { label: 'Documentaries', to: '/resources/documentaries' },
      { label: 'Annual Reports', to: '/resources/annual-reports' },
    ],
  },
  {
    label: 'Get Involved',
    children: [
      { label: 'Be Part of the Network', to: '/get-involved' },
      { label: 'Participate in Projects', to: '/participate' },
      { label: 'Stay Informed', to: '/stay-informed' },
      { label: 'Work with us', to: '/work-with-us' },
      { label: 'Contact Us', to: '/contact-us' },
    ],
  },
  { label: 'Donate', to: '/donate' },
]
