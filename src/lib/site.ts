export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
  { label: "Add Book", href: "/add-book" },
];

export const BOOK_CATEGORIES = [
  { label: "Fiction", count: 1248 },
  { label: "Mystery", count: 342 },
  { label: "Fantasy", count: 205 },
  { label: "Romance", count: 189 },
  { label: "Science", count: 156 },
  { label: "History", count: 133 },
] as const;

export const ALL_CATEGORIES = [
  "Select a category",
  "Fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Science",
  "History",
];

export type PlaceholderBook = {
  id: number;
  title: string;
  author: string;
  category: string;
  from: string;
  to: string;
  isNew?: boolean;
  description: string;
};

export const PLACEHOLDER_BOOKS: PlaceholderBook[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    from: "#3b6f6a",
    to: "#123c3a",
    isNew: true,
    description: "Between life and death there is a library of infinite choices.",
  },
  {
    id: 2,
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    category: "Fantasy",
    from: "#4b3a8f",
    to: "#22154f",
    description: "A ruthless elite war college for dragon riders.",
  },
  {
    id: 3,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Mystery",
    from: "#8f3a4b",
    to: "#4f1522",
    isNew: true,
    description: "A woman's silence and a painter's obsession.",
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    from: "#8a5a2b",
    to: "#4a2c10",
    description: "A brief history of humankind.",
  },
  {
    id: 5,
    title: "Educated",
    author: "Tara Westover",
    category: "History",
    from: "#2b6a8a",
    to: "#0f3a4f",
    description: "A memoir of growing up, learning, and transformation.",
  },
  {
    id: 6,
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Science",
    from: "#2b4a8a",
    to: "#101d3f",
    isNew: true,
    description: "One astronaut, one impossible mission, humanity's last hope.",
  },
  {
    id: 7,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    from: "#8a2b5a",
    to: "#43102b",
    description: "A sparkling comedy of manners and first impressions.",
  },
  {
    id: 8,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    category: "Fantasy",
    from: "#8a6a2b",
    to: "#40300f",
    description: "The life story of a notoriously gifted young man.",
  },
  {
    id: 9,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Fiction",
    from: "#3fa372",
    to: "#16503a",
    description: "An easy and proven way to build good habits and break bad ones.",
  },
  {
    id: 10,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    from: "#5a3382",
    to: "#26123f",
    description: "From the Big Bang to black holes.",
  },
  {
    id: 11,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    from: "#2f7a5f",
    to: "#123a2f",
    description: "Longing, jazz, and the green light at the end of the dock.",
  },
  {
    id: 12,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    category: "Romance",
    from: "#a04568",
    to: "#54203a",
    description: "A brave and heartbreaking novel about love.",
  },
];
