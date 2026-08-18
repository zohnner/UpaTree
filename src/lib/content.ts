// Placeholder company content for Up A Tree LLC.
// Swap these values for real copy, pricing, and service-area details
// once provided by the client.

export const company = {
  name: "Up A Tree LLC",
  tagline: "Kansas City's trusted tree trimming & removal crew",
  phone: "(816) 555-0173",
  phoneHref: "tel:+18165550173",
  email: "info@upatreekc.com",
  address: "Kansas City, MO",
  hours: "Mon–Sat: 7:00 AM – 6:00 PM",
  serviceAreaSummary: "Kansas City metro, both sides of the state line",
};

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  bullets: string[];
}

export const services: Service[] = [
  {
    slug: "tree-removal",
    name: "Tree Removal",
    shortDescription: "Safe, full-service removal of dead, damaged, or unwanted trees.",
    description:
      "Whether a storm left a tree leaning on your fence or you're clearing space for a new build, our crew removes trees of any size safely and efficiently, with full cleanup included.",
    bullets: [
      "Licensed & insured climbers and equipment operators",
      "Storm damage and emergency removal",
      "Tight-access and near-structure removals",
      "Full debris cleanup and haul-away",
    ],
  },
  {
    slug: "trimming-pruning",
    name: "Trimming & Pruning",
    shortDescription: "Keep trees healthy, shapely, and safe with routine trimming.",
    description:
      "Regular pruning improves tree health, air flow, and appearance, and reduces the risk of falling limbs near your home, driveway, or power lines.",
    bullets: [
      "Deadwood and hazard-limb removal",
      "Crown thinning and shaping",
      "Clearance trimming from roofs and power lines",
      "Seasonal maintenance plans",
    ],
  },
  {
    slug: "stump-grinding",
    name: "Stump Grinding & Removal",
    shortDescription: "Grind stumps flush and reclaim your yard.",
    description:
      "Leftover stumps attract pests and get in the way of mowing or landscaping. We grind stumps below grade and can haul away or mulch the debris.",
    bullets: [
      "Stumps of any size, single or multiple",
      "Grinding below grade for reseeding or landscaping",
      "Root flare and surface root grinding",
      "Optional debris haul-away",
    ],
  },
  {
    slug: "storm-emergency",
    name: "Storm & Emergency Response",
    shortDescription: "Fast response when a tree comes down unexpectedly.",
    description:
      "Kansas City weather doesn't always give a warning. We offer rapid-response service for storm-damaged and fallen trees to make your property safe again.",
    bullets: [
      "Priority scheduling for emergencies",
      "Tree and limb removal off structures and vehicles",
      "Work with insurance documentation",
      "Debris clearing from driveways and roofs",
    ],
  },
  {
    slug: "land-lot-clearing",
    name: "Land & Lot Clearing",
    shortDescription: "Clear brush, trees, and undergrowth for new projects.",
    description:
      "From small residential lots to larger acreage, we clear trees and brush to prepare sites for construction, fencing, or general property cleanup.",
    bullets: [
      "Residential and light commercial lots",
      "Brush and undergrowth clearing",
      "Selective clearing to preserve mature trees",
      "Site cleanup and debris removal",
    ],
  },
  {
    slug: "health-consulting",
    name: "Tree Health Consulting",
    shortDescription: "On-site assessment of tree health and risk.",
    description:
      "Not sure if a tree needs to come down or just needs care? Our team inspects the tree and gives you a clear, honest recommendation.",
    bullets: [
      "Disease and pest identification",
      "Structural risk assessment",
      "Recommendations for treatment vs. removal",
      "Written estimates on the spot",
    ],
  },
];

export const serviceAreaCities = [
  "Kansas City, MO",
  "Overland Park, KS",
  "Olathe, KS",
  "Lenexa, KS",
  "Shawnee, KS",
  "Prairie Village, KS",
  "Leawood, KS",
  "Independence, MO",
  "Lee's Summit, MO",
  "Blue Springs, MO",
  "Liberty, MO",
  "North Kansas City, MO",
];

export const testimonials = [
  {
    quote:
      "Up A Tree took down a massive oak that was leaning over our garage after a storm. Fast, careful, and cleaned up everything.",
    author: "Debra H., Overland Park",
  },
  {
    quote:
      "Fair pricing and they showed up exactly when they said they would. Ground three stumps in about an hour.",
    author: "Tom R., Kansas City",
  },
  {
    quote:
      "Professional crew, great communication, and our yard looked better than before they started.",
    author: "Priya S., Lee's Summit",
  },
];
