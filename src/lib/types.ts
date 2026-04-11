export interface Tile {
  id: string;
  name: string;
  desc: string;
  icon: 'folder' | 'pdf' | 'xlsx' | 'doc' | 'form';
  openFolder?: string; // if clicking opens another folder instead of preview
}

export interface Folder {
  id: string;
  title: string;
  address: string;
  tiles: Tile[];
}

export interface PageContent {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
}

export interface TimelineEntry {
  year: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  pricing?: string;
}

export interface WallpaperConfig {
  id: string;
  src: string;
  alt: string;
}
