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
  {
    name: 'Signature Turkish Cut',
    description: 'Scissor-and-clipper work finished with hot towel and styling.',
    price: 'from £22',
  },
  {
    name: 'Beard Sculpt & Line-up',
    description: 'Shape, define, and condition — razor-sharp edges, natural finish.',
    price: 'from £14',
  },
  {
    name: 'Hot Towel Shave',
    description: 'Classic straight-razor experience with aromatic oils and balm.',
    price: 'from £18',
  },
  {
    name: 'Skin Fade',
    description: 'Seamless gradients, crisp lineup, and premium product finish.',
    price: 'from £24',
  },
  {
    name: 'Cut & Beard Combo',
    description: 'Full groom — hair, beard, and hot towel in one visit.',
    price: 'from £32',
  },
  {
    name: 'Head Shave',
    description: 'Smooth finish with hot towel prep and post-shave care.',
    price: 'from £16',
  },
] as const;

export const GALLERY_ITEMS = [
  { title: 'Precision fade', accent: 'from-amber-900/40 to-zinc-950' },
  { title: 'Hot towel ritual', accent: 'from-stone-700/50 to-zinc-950' },
  { title: 'Beard sculpting', accent: 'from-yellow-900/30 to-zinc-950' },
  { title: 'Classic cut', accent: 'from-neutral-600/40 to-zinc-950' },
  { title: 'Shop interior', accent: 'from-amber-950/50 to-black' },
  { title: 'Finishing detail', accent: 'from-zinc-600/40 to-zinc-950' },
] as const;

export const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#booking', label: 'Book' },
  { href: '#contact', label: 'Contact' },
] as const;
