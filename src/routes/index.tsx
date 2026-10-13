import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nihongo Quest — Aprenda japonês" },
      {
        name: "description",
        content: "Trilha de micro-lições de japonês do zero ao JLPT N1, com áudio e revisão espaçada.",
      },
      { property: "og:title", content: "Nihongo Quest — Aprenda japonês" },
      {
        property: "og:description",
        content: "Trilha de micro-lições de japonês do zero ao JLPT N1, com áudio e revisão espaçada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/licoes" });
  },
});
