import { Link } from "@tanstack/react-router";
import { Check, ChevronRight, Lock, Star } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Licao } from "@/data/licoes";
import { cn } from "@/lib/utils";

const OFFSETS = [0, 56, 84, 56, 0, -56, -84, -56];
const MOBILE = [0, 36, 52, 36, 0, -36, -52, -36];

export function TrailNode({ lessons, position, done, currentId }: {
  lessons: Licao[];
  position: number;
  done: Set<string>;
  currentId: string | undefined;
}) {
  const first = lessons[0];
  if (!first) return null;
  const completed = lessons.filter((l) => done.has(l.id)).length;
  const finished = completed === lessons.length;
  const current = lessons.some((l) => l.id === currentId);
  const locked = !finished && !current;
  const title = first.modo === "novas" ? first.capituloTitulo : "Prática da unidade";
  return (
    <div className="trilha-no relative flex flex-col items-center gap-2" style={{
      "--offset-mobile": `${MOBILE[position % MOBILE.length] ?? 0}px`,
      "--offset-desktop": `${OFFSETS[position % OFFSETS.length] ?? 0}px`,
    } as React.CSSProperties}>
      {current && <span className="trail-callout rounded-md bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">CONTINUAR</span>}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" aria-label={`${title}, ${completed} de ${lessons.length} lições concluídas${locked ? ", bloqueado" : ""}`} className={cn(
            "trail-circle relative h-[76px] w-[76px] rounded-full border-[5px] p-0 sm:h-[88px] sm:w-[88px]",
            finished && "border-trail-mint bg-trail-mint/15 text-trail-mint hover:bg-trail-mint/20",
            current && "trail-current border-primary bg-primary/10 text-primary hover:bg-primary/15",
            locked && "border-border bg-secondary text-muted-foreground hover:bg-secondary",
          )}>
            <span className={cn("flex h-12 w-12 items-center justify-center rounded-full border-b-4 sm:h-14 sm:w-14", locked ? "border-border bg-muted" : finished ? "border-trail-mint/60 bg-trail-mint text-primary-foreground" : "border-primary/60 bg-primary text-primary-foreground")}>
              {finished ? <Check className="h-6 w-6" /> : locked ? <Lock className="h-5 w-5" /> : <Star className="h-6 w-6 fill-current" />}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg p-5">
          <DialogHeader className="pr-5">
            <DialogTitle className="leading-snug">{first.unidadeTitulo} · {title}</DialogTitle>
            <DialogDescription>{completed} de {lessons.length} lições concluídas</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2" aria-hidden="true">
            {lessons.map((l) => <span key={l.id} className={cn("h-2 flex-1 rounded-full", done.has(l.id) ? "bg-trail-mint" : l.id === currentId ? "bg-primary" : "bg-border")} />)}
          </div>
          <ol className="space-y-3">
            {lessons.map((lesson, i) => {
              const completedLesson = done.has(lesson.id);
              const available = completedLesson || lesson.id === currentId;
              const content = <><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">{completedLesson ? <Check className="h-4 w-4" /> : available ? i + 1 : <Lock className="h-4 w-4 text-muted-foreground" />}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{lesson.title.replace(/^.*— /, "")}</span><span className="block text-xs font-normal text-muted-foreground">{completedLesson ? "Concluída · Praticar novamente" : `${lesson.capituloTitulo} · ${lesson.duration}`}</span></span>{available && <ChevronRight className="h-4 w-4 shrink-0" />}</>;
              return <li key={lesson.id}>{available ? <Link to="/licoes/$id" params={{ id: lesson.id }} className={cn(buttonVariants({ variant: "outline" }), "h-auto w-full justify-start whitespace-normal p-3 text-left")}>{content}</Link> : <div aria-disabled="true" className="flex items-center gap-2 rounded-lg border border-border p-3 opacity-60">{content}</div>}</li>;
            })}
          </ol>
          {locked && <p className="text-center text-xs text-muted-foreground">Conclua as lições anteriores para desbloquear.</p>}
        </DialogContent>
      </Dialog>
      <div className="flex gap-1.5" aria-hidden="true">{lessons.map((l) => <span key={l.id} className={cn("h-1.5 w-4 rounded-full", done.has(l.id) ? "bg-trail-mint" : l.id === currentId ? "bg-primary" : "bg-border")} />)}</div>
      <span className="max-w-[120px] text-center text-[11px] font-semibold text-muted-foreground">{title}</span>
    </div>
  );
}