export const BUSINESS = {
  name: 'Top Turkish Barbers',
  tagline: 'Premium grooming in the heart of Shrewsbury',
  description:
    'Traditional Turkish barbering with modern precision — hot towel shaves, expert fades, and a welcome worth remembering.',
  address: {
    line1: '12 Mount Pleasant Rd',
    city: 'Shrewsbury',
    postcode: 'SY1 3BQ',
    country: 'United Kingdom',
  },
  locationDescription: 'Located in the heart of Shrewsbury',
  phone: '+447784300001',
  phoneDisplay: '07784 300 001',
  email: 'topturkishbarbers@gmail.com',
  whatsappUrl: 'https://wa.me/447784300001',
  mapCoordinates: {
    lat: 52.7264,
    lng: -2.7385,
  },
  hours: [
    { day: 'Monday – Saturday', time: '9:00am – 6:30pm' },
    { day: 'Sunday', time: '10:00am – 4:00pm' },
  ],
} as const;

export const SERVICES = [
  { name: 'Hair Cut', price: '£14', icon: '/images/services/hair-cut.png' },
  { name: 'Hot Towel Shave', price: '£18', icon: '/images/services/hot-towel-shave.png' },
  { name: 'Hot Steam', price: '£10', icon: '/images/services/hot-steam.png' },
  { name: 'Beard Trim', price: '£10', icon: '/images/services/beard-trim.png' },
  { name: 'Skin Fades', price: '£16', icon: '/images/services/skin-fades.png' },
  { name: 'Face Mask', price: '£12', icon: '/images/services/face-mask.png' },
  { name: 'Hot Wax', price: '£8', icon: '/images/services/hot-wax.png' },
] as const;

/** Temporary imagery — replace with on-site photography. */
export const PLACEHOLDER_IMAGES = {
  hero: '/images/hero-interior.png',
} as const;

const galleryImage = (filename: string) =>
  `/images/gallery/${encodeURIComponent(filename)}`;

/** One row × three columns; portrait images only, three per carousel. */
export const GALLERY_COLUMNS = [
  [
    galleryImage('Screenshot 2026-06-05 180033.png'),
    galleryImage('Screenshot 2026-06-05 180106.png'),
    galleryImage('Screenshot 2026-06-05 180116.png'),
  ],
  [
    galleryImage('Screenshot 2026-06-05 180134.png'),
    galleryImage('Screenshot 2026-06-05 180152.png'),
    galleryImage('Screenshot 2026-06-05 180204.png'),
  ],
  [
    galleryImage('Screenshot 2026-06-05 180312.png'),
    galleryImage('Screenshot 2026-06-05 180324.png'),
    galleryImage('Screenshot 2026-06-05 180337.png'),
  ],
] as const;

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
] as const;
