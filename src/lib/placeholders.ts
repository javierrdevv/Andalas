export const PLACEHOLDER_IMAGES = {
  hero: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
  about: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  service: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
  project: "https://images.unsplash.com/photo-1504307651254-59deb58ef4e?auto=format&fit=crop&w=800&q=80",
  testimonial: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
} as const;

export function getImageOrPlaceholder(url: string | null | undefined, fallback: keyof typeof PLACEHOLDER_IMAGES = "project"): string {
  return url && url.trim() ? url : PLACEHOLDER_IMAGES[fallback];
}
