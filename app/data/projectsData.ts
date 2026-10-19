export interface StorySection {
  challenge: string;
  execution: string;
  outcome: string;
}

export interface Project {
  id: string;
  slug: string; // Dynamic URL identifier (e.g. /projects/legal-secondary-suite-calgary)
  title: string;
  category: string;
  location: string;
  description: string;
  storyBlurb?: StorySection;
  airbnbUrl?: string;
  rating?: number;
  reviewCount?: string;
  blueprintImage?: string;
  renderImage?: string;
  images: string[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "project-1",
    slug: "legal-secondary-suite-calgary",
    title: "Legal Secondary Suite for AirBnB",
    category: "96 Crimson Ridge Place NW",
    location: "Calgary, AB",
    description:
      "A subterranean residence in Rockland Park engineered with high-grade soundproofing, luxury spa-like washroom, integrated ambient architectural lighting, and an independent private entrance.",
    storyBlurb: {
      challenge:
        "The husband envisioned a high-tech cinema retreat with a 110-inch screen; and the wife saw a high-yield secondary suite to earn income. With two toddlers upstairs requiring a loud and free main floor, the design and build required zero compromises.",
      execution:
        "Engineered with complete ROCKWOOL ceiling and stairwell acoustic insulation to eliminate sound transfer. Built out with a full kitchen, veined black marble spa bathroom with warm under-cabinet lighting, smart thermostats, and custom limewash indigo feature walls.",
      outcome:
        "A 600 sq. ft. zero-touch basement suite that reached Airbnb Superhost status while generating steady passive revenue for the family as an income-generating asset, while accomplishing a zero-compromise private cinema sanctuary on the main floor of their home.",
    },
    airbnbUrl: "https://airbnb.ca/h/sanctumsanctorum",
    rating: 5.0,
    reviewCount: "Superhost Verified",
    blueprintImage: "/images/projects/%231/blueprint.png",
    renderImage: "/images/projects/%231/rendering.jpeg",
    images: [
      "/images/projects/%231/96%20CRP%20-1.jpg",
      "/images/projects/%231/96%20CRP%20-2.jpg",
      "/images/projects/%231/96%20CRP%20-3.jpg",
      "/images/projects/%231/96%20CRP%20-4.jpg",
      "/images/projects/%231/96%20CRP%20-5.jpg",
      "/images/projects/%231/96%20CRP%20-6.jpg",
      "/images/projects/%231/96%20CRP%20-7.jpg",
      "/images/projects/%231/96%20CRP%20-8.jpg",
      "/images/projects/%231/96%20CRP%20-9.jpg",
      "/images/projects/%231/96%20CRP%20-10.jpg",
      "/images/projects/%231/96%20CRP%20-11.jpg",
    ],
  },
];