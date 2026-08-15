import { notFound, redirect } from "next/navigation";

const sectionAnchors: Record<string, string> = {
  vision: "apropos",
  mission: "apropos",
  parcours: "parcours",
  histoire: "parcours",
  equipe: "equipe",
};

export default async function AboutSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const anchor = sectionAnchors[section];

  if (!anchor) notFound();

  redirect(`/#${anchor}`);
}
