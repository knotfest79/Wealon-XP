import { notFound } from "next/navigation";
import { WebPageLayout } from "@/modules/content/components/WebPageLayout";
import { buildMetadata } from "@/modules/content/data/metadata";
import { seoRoutes } from "@/modules/content/data/routes";

const serviceRoutes = seoRoutes.filter(
  (route) => route.section === "services" && route.path !== "/services",
);

function getRoute(slug: string) {
  return serviceRoutes.find((route) => route.path === `/services/${slug}`);
}

export function generateStaticParams() {
  return serviceRoutes.map((route) => ({
    slug: route.path.replace("/services/", ""),
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

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) notFound();

  return <WebPageLayout pageId={route.pageId} />;
}
