import { WebPageLayout } from "@/modules/content/components/WebPageLayout";
import { buildMetadata } from "@/modules/content/data/metadata";
import { getSeoRoute } from "@/modules/content/data/routes";

const route = getSeoRoute("/about")!;

export const metadata = buildMetadata(route);

export default function AboutPage() {
  return <WebPageLayout pageId={route.pageId} />;
}
