import { notFound } from "next/navigation";
import { WebPageLayout } from "@/modules/content/components/WebPageLayout";
import { buildMetadata } from "@/modules/content/data/metadata";
import { seoRoutes } from "@/modules/content/data/routes";

const aboutRoutes = seoRoutes.filter(
  (route) => route.section === "about" && route.path !== "/about",
);

function getRoute(slug: string) {
  return aboutRoutes.find((route) => route.path === `/about/${slug}`);
}

export function generateStaticParams() {
  return aboutRoutes.map((route) => ({
    slug: route.path.replace("/about/", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) return {};
  return buildMetadata(route);
}

export default async function AboutSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) notFound();

  return <WebPageLayout pageId={route.pageId} />;
}
