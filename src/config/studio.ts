/**
 * Sample studio config.
 *
 * A complete, fictional tattoo studio conforming to `StudioConfig`. This file
 * exercises every section of the schema and doubles as a reference for
 * hand-authoring a fresh client config. All copy is in English on purpose:
 * the template is a drop-in starting point for English-first studios.
 *
 * Image paths are referenced as plain strings under `/images/...`. The files
 * do not need to exist at build time; they are placeholders for real media.
 */

import type {
  Artist,
  PortfolioItem,
  Service,
  StudioConfig,
} from '../types/studio'

const artists: Artist[] = [
  {
    id: 'artist-mara',
    name: 'Mara Okafor',
    slug: 'mara-okafor',
    bio: 'Award-winning blackwork and realism specialist with 12 years behind the machine. Mara builds deep-contrast, high-detail pieces and leads the studio\u2019s scar-coverup work.',
    styles: ['blackwork', 'realism', 'tribal'],
    photo: '/images/artists/mara-okafor.jpg',
  },
  {
    id: 'artist-jules',
    name: 'Jules Rivera',
    slug: 'jules-rivera',
    bio: 'Bright-color and neo-traditional illustrator known for bold linework and playful, botanical-heavy compositions. Jules favours flowers, skulls, and classic Americana.',
    styles: ['traditional', 'neo-traditional', 'color'],
    photo: '/images/artists/jules-rivera.jpg',
  },
  {
    id: 'artist-leo',
    name: 'Leo Chen',
    bio: 'Fine-line minimal and lettering artist crafting delicate, placement-mindful work, from single-needle text to geometric dotwork.',
    styles: ['minimal', 'lettering'],
    photo: '/images/artists/leo-chen.jpg',
  },
]

const portfolio: PortfolioItem[] = [
  {
    id: 'piece-001',
    title: 'Wolf in Snow',
    artistId: 'artist-mara',
    style: 'blackwork',
    image: '/images/traditional-wolf.jpg',
    year: '2025',
    healed: true,
    featured: true,
    alt: 'High-contrast blackwork wolf mid-howl framed in a moon, recently healed.',
  },
  {
    id: 'piece-002',
    title: 'Serpent and Ribbon',
    artistId: 'artist-mara',
    style: 'realism',
    image: '/images/realism-serpent.jpg',
    year: '2024',
    alt: 'Photorealistic serpent coiled around a silk ribbon in grey-scale.',
  },
  {
    id: 'piece-003',
    title: 'Tribal Forearm Sleeve',
    artistId: 'artist-mara',
    style: 'tribal',
    image: '/images/tribal-sleeve.jpg',
    year: '2024',
    healed: true,
    alt: 'Black tribal forearm sleeve with angular geometric flow.',
  },
  {
    id: 'piece-004',
    title: 'Rose of the Ivy',
    artistId: 'artist-jules',
    style: 'neo-traditional',
    image: '/images/neotrad-rose.jpg',
    year: '2025',
    featured: true,
    alt: 'Neo-traditional rose wrapped in ivy with rich red and green hues.',
  },
  {
    id: 'piece-005',
    title: 'Sunburst Sailor Chest Piece',
    artistId: 'artist-jules',
    style: 'traditional',
    image: '/images/traditional-sunburst.jpg',
    year: '2023',
    healed: true,
    alt: 'Classic traditional sunburst and eagle chest piece with bold outlines.',
  },
  {
    id: 'piece-006',
    title: 'Koi in the Deep',
    artistId: 'artist-jules',
    style: 'color',
    image: '/images/color-koi.jpg',
    year: '2025',
    featured: true,
    alt: 'Vibrant koi carp with splashes of orange, teal, and indigo.',
  },
  {
    id: 'piece-007',
    title: 'Fine-Line Mountain Ridge',
    artistId: 'artist-leo',
    style: 'minimal',
    image: '/images/minimal-mountain.jpg',
    year: '2024',
    healed: true,
    alt: 'Single-needle minimal mountain ridge along a wrist.',
  },
  {
    id: 'piece-008',
    title: 'Hairline Script',
    artistId: 'artist-leo',
    style: 'lettering',
    image: '/images/lettering-script.jpg',
    year: '2025',
    alt: 'Delicate script lettering reading \u201Ccarpe diem\u201D along a collarbone.',
  },
  {
    id: 'piece-009',
    title: 'Geometric Dotwork Band',
    artistId: 'artist-leo',
    style: 'minimal',
    image: '/images/minimal-dotwork.jpg',
    year: '2023',
    alt: 'Geometric dotwork arm band in a clean, repeating pattern.',
  },
  {
    id: 'piece-010',
    title: 'Barn Swallow Duo',
    artistId: 'artist-jules',
    style: 'traditional',
    image: '/images/traditional-swallow.jpg',
    year: '2022',
    healed: true,
    alt: 'Pair of traditional barn swallows with the classic red-and-black palette.',
  },
]

const services: Service[] = [
  {
    id: 'svc-small',
    name: 'Small Tattoo',
    price: 120,
    description: 'Palm-sized or smaller piece, roughly one appointment.',
    bookingTypes: ['tattoo'],
    duration: '1-2 hours',
  },
  {
    id: 'svc-medium',
    name: 'Medium Tattoo',
    price: 280,
    description: 'From palm to forearm size, includes a two-hour minimum.',
    bookingTypes: ['tattoo'],
    duration: '2-4 hours',
  },
  {
    id: 'svc-full-sleeve',
    name: 'Full Sleeve (Custom)',
    price: 'On request',
    description: 'Multi-session custom sleeve designed with your chosen artist.',
    bookingTypes: ['tattoo'],
  },
  {
    id: 'svc-ear-piercing',
    name: 'Ear Piercing (Lobe)',
    price: 45,
    description: 'Single lobe piercing with autoclave-sterilised jewellery included.',
    bookingTypes: ['piercing'],
    duration: '30 min',
  },
  {
    id: 'svc-industrial-piercing',
    name: 'Industrial Piercing',
    price: 85,
    bookingTypes: ['piercing'],
    duration: '45 min',
  },
  {
    id: 'svc-consultation',
    name: 'Design Consultation',
    price: 0,
    description: 'Free 30-minute consult to sketch the direction and quote your piece.',
    bookingTypes: ['consultation'],
    duration: '30 min',
  },
]

export const studioConfig: StudioConfig = {
  studioName: 'Iron & Ink Studio',
  tagline: 'Honest tattoos, done right, in the heart of Portland.',
  city: 'Portland, Oregon',
  whatsapp: '15550001111',
  instagram: 'ironandinkstudio',
  // `address` is intentionally omitted to demonstrate that the schema allows
  // optional fields to be absent. Clients that publish a physical walk-in
  // location can add it; online-only studios can leave it out.
  hours: {
    mon: '11:00-19:00',
    tue: '11:00-19:00',
    wed: null,
    thu: '11:00-19:00',
    fri: '11:00-21:00',
    sat: '10:00-18:00',
    sun: null,
  },
  artists,
  portfolio,
  services,
  faq: [
    {
      q: 'How do I book an appointment?',
      a: 'Message us on WhatsApp or book online through the Booking page. We reply within one business day to confirm your slot.',
    },
    {
      q: 'Do you accept walk-ins?',
      a: 'We are closed on Wednesdays and Sundays, but otherwise open daily. Walk-ins are welcome subject to availability.',
    },
    {
      q: 'How much does a custom sleeve cost?',
      a: 'Full sleeves are quoted on request because time and complexity vary widely. Book a free consultation and we\u2019ll give you an exact figure.',
    },
    {
      q: 'What is your deposit policy?',
      a: 'A non-refundable deposit is required to reserve a tattoo slot and is applied to the final price of your piece.',
    },
  ],
  theme: {
    primary: '#0c0c10',
    accent: '#ff6b3d',
    background: '#101014',
    foreground: '#f4f1ea',
  },
}