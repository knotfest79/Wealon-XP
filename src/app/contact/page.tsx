import { WebPageLayout } from "@/modules/content/components/WebPageLayout";
import { buildMetadata } from "@/modules/content/data/metadata";
import { getSeoRoute } from "@/modules/content/data/routes";

const route = getSeoRoute("/contact")!;

export const metadata = buildMetadata(route);

export default function ContactPage() {
  return <WebPageLayout pageId={route.pageId} />;
}
