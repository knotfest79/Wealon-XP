export type DefaultWallpaper = {
  id: string;
  name: string;
  src: string;
  alt: string;
};

export const defaultWallpapers: DefaultWallpaper[] = [
  { id: "bliss", name: "Bliss", src: "/wallpapers/bliss.jpg", alt: "Bliss - Classic green hills" },
  { id: "autumn", name: "Autumn", src: "/wallpapers/autumn.jpg", alt: "Autumn path" },
  { id: "fish", name: "Fish", src: "/wallpapers/fish.jpg", alt: "Tropical fish" },
  { id: "bliss4k", name: "Bliss 4K", src: "/wallpapers/bliss4k.webp", alt: "Bliss 4K remaster" },
  { id: "sunset", name: "Sunset", src: "/wallpapers/sunset.png", alt: "Sunset hills" },
];
