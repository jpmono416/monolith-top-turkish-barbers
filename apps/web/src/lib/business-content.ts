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
  locationDescription: 'Located in the heart of Shrewsbury',
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
  galleryWide: '/placeholders/gallery-wide.svg',
  galleryPortraitOne: '/placeholders/gallery-portrait-1.png',
  galleryPortraitTwo: '/placeholders/gallery-portrait-2.png',
  galleryPortraitThree: '/placeholders/gallery-portrait-3.png',
} as const;

/** One row × three columns; portrait images only, three per carousel. */
export const GALLERY_COLUMNS = [
  [
    PLACEHOLDER_IMAGES.galleryPortraitOne,
    PLACEHOLDER_IMAGES.galleryPortraitTwo,
    PLACEHOLDER_IMAGES.galleryPortraitThree,
  ],
  [
    PLACEHOLDER_IMAGES.galleryPortraitTwo,
    PLACEHOLDER_IMAGES.galleryPortraitThree,
    PLACEHOLDER_IMAGES.galleryPortraitOne,
  ],
  [
    PLACEHOLDER_IMAGES.galleryPortraitThree,
    PLACEHOLDER_IMAGES.galleryPortraitOne,
    PLACEHOLDER_IMAGES.galleryPortraitTwo,
  ],
] as const;

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
] as const;
