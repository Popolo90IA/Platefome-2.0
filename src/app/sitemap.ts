import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plateform.app";

  const supabase = await createClient();
  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("slug, updated_at")
    .eq("is_active", true);

  const menuUrls: MetadataRoute.Sitemap = (restaurants ?? []).map((r) => ({
    url: `${siteUrl}/menu/${r.slug}`,
    lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...menuUrls,
  ];
}
