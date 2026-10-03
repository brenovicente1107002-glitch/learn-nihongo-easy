import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import {
  BookOpen,
  
  GraduationCap,
  Home,
  Layers,
  Library,
  Menu,
  NotebookPen,
  RefreshCw,
  ScrollText,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import { AomaruAvatar, AomaruTip } from "../components/mascot";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado do nosso lado. Você pode tentar recarregar ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nihongo Quest — Aprenda japonês" },
      {
        name: "description",
        content:
          "Aprenda japonês com lições, flashcards, hiragana, katakana, kanji, vocabulário e gramática.",
      },
      { name: "author", content: "Nihongo Quest" },
      { property: "og:title", content: "Nihongo Quest — Aprenda japonês" },
      {
        property: "og:description",
        content:
          "Aprenda japonês com lições, flashcards, hiragana, katakana, kanji, vocabulário e gramática.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@nihongoquest" },
      { name: "theme-color", content: "#2f62c4" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Nihongo Quest" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <Outlet />
      </AppShell>
    </QueryClientProvider>
  );
}

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/licoes", label: "Lições", icon: GraduationCap },
  { to: "/palavras", label: "Palavras", icon: NotebookPen },
  { to: "/revisao", label: "Revisão", icon: RefreshCw },
  { to: "/flashcards", label: "Flashcards", icon: Layers },
  { to: "/hiragana", label: "Hiragana", icon: ScrollText },
  { to: "/katakana", label: "Katakana", icon: BookOpen },
  { to: "/kanji", label: "Kanji", icon: Sparkles },
  { to: "/conta", label: "Conta", icon: UserRound },
];

function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <AomaruAvatar className="h-8 w-8" />
          </div>

          <span className="font-display text-lg font-semibold tracking-tight">Nihongo Quest</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.to)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <AomaruTip size="sm" className="p-3" />
        </div>

      </aside>

      {/* Mobile header */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-card px-4 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <AomaruAvatar className="h-7 w-7" />
        </div>
        <span className="font-display text-base font-semibold">Nihongo Quest</span>
      </div>

      {/* Mobile "Mais" sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-card p-4 pb-8 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Mais</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {navItems.slice(4).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-sm font-semibold transition-colors",
                      isActive(item.to)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <Icon className="h-7 w-7" strokeWidth={2.2} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-border bg-card pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="mx-auto flex max-w-lg items-stretch justify-around px-1">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-1 flex-col items-center gap-0.5 py-2"
                aria-label={item.label}
              >
                <span
                  className={cn(
                    "flex h-10 w-12 items-center justify-center rounded-xl border-2 transition-all",
                    active
                      ? "border-primary/60 bg-primary/10 text-primary scale-105"
                      : "border-transparent text-muted-foreground",
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={active ? 2.6 : 2} />
                </span>
                <span className={cn("text-[10px] font-semibold", active ? "text-primary" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-1 flex-col items-center gap-0.5 py-2"
            aria-label="Mais"
          >
            <span
              className={cn(
                "flex h-10 w-12 items-center justify-center rounded-xl border-2 transition-all",
                navItems.slice(4).some((i) => isActive(i.to))
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-transparent text-muted-foreground",
              )}
            >
              <Menu className="h-6 w-6" />
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground">Mais</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 lg:pl-64">
        <div className="min-h-screen pt-14 pb-24 lg:pt-0 lg:pb-0">
          <div className="mx-auto max-w-7xl p-4 lg:p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
