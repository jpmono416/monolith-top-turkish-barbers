export const BUSINESS = {
  name: 'Top Turkish Barbers',
  tagline: 'Premium grooming in the heart of Shrewsbury',
  description:
    'Traditional Turkish barbering with modern precision — hot towel shaves, expert fades, and a welcome worth remembering.',
  address: {
    line1: '12 Castle Street',
    city: 'Shrewsbury',
    postcode: 'SY1 2BQ',
    country: 'United Kingdom',
  },
  phone: '+441743369000',
  phoneDisplay: '01743 369 000',
  email: 'hello@topturkishbarbers.co.uk',
  whatsappUrl: 'https://wa.me/441743369000',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.0!2d-2.7520!3d52.7109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDQyJzM5LjIiTiAywrA0NScwNy4yIlc!5e0!3m2!1sen!2suk!4v1',
  hours: [
    { day: 'Monday – Friday', time: '9:00 – 18:30' },
    { day: 'Saturday', time: '8:30 – 17:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
} as const;

export const SERVICES = [
  { name: 'Hair cut', price: '£14' },
  { name: 'Hot towel shave', price: '£18' },
  { name: 'Hot steam', price: '£10' },
  { name: 'Beard trim', price: '£10' },
  { name: 'Skin fades', price: '£16' },
  { name: 'Face mask', price: '£12' },
  { name: 'Hot wax', price: '£8' },
] as const;

/** Layout placeholders — replace with on-site photography. */
export const PLACEHOLDER_IMAGES = {
  hero: '/placeholders/hero.svg',
  galleryWide: '/placeholders/gallery-wide.svg',
  galleryPortrait: '/placeholders/gallery-portrait.svg',
} as const;

export const GALLERY_ITEMS = [
  { title: 'Precision fade', image: PLACEHOLDER_IMAGES.galleryWide, featured: true },
  { title: 'Hot towel ritual', image: PLACEHOLDER_IMAGES.galleryPortrait },
  { title: 'Beard sculpting', image: PLACEHOLDER_IMAGES.galleryPortrait },
  { title: 'Classic cut', image: PLACEHOLDER_IMAGES.galleryPortrait },
  { title: 'Shop interior', image: PLACEHOLDER_IMAGES.galleryPortrait },
  { title: 'Finishing detail', image: PLACEHOLDER_IMAGES.galleryPortrait },
] as const;

export const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#booking', label: 'Book' },
  { href: '#contact', label: 'Contact' },
] as const;
