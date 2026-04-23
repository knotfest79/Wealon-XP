import type { Metadata } from "next";
import { getOpenGraphImage, SeoRoute, siteUrl } from "./routes";

export function buildMetadata(route: SeoRoute): Metadata {
  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: route.path,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: `${siteUrl}${route.path}`,
      siteName: "Wealon Tax & Accounting",
      type: "website",
      images: [
        {
          url: getOpenGraphImage(),
          width: 1864,
          height: 1243,
          alt: "Wealon Tax & Accounting",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [getOpenGraphImage()],
    },
  };
}
