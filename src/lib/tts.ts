/** Áudio nativo em japonês: voz ja-JP do navegador, com fallback de servidor. */

let cached: SpeechSynthesisVoice | null = null;
let listening = false;
let keepAlive: ReturnType<typeof setInterval> | null = null;
let fallbackAudio: HTMLAudioElement | null = null;
const urlCache = new Map<string, string>();

export function ttsDisponivel(): boolean {
  return typeof window !== "undefined";
}

function synthDisponivel(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function findJa(): SpeechSynthesisVoice | null {
  if (!synthDisponivel()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const ja = voices.filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith("ja"));
  if (!ja.length) return null;
  return ja.find((v) => v.localService) ?? ja[0] ?? null;
}

/** As vozes chegam de forma assíncrona no Chrome/Safari: escuta o evento. */
function ensureVoices() {
  if (!synthDisponivel() || listening) return;
  listening = true;
  cached = findJa();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    cached = findJa();
  });
}

/** Toca o áudio gerado no servidor (Lovable AI) quando não há voz ja-JP local. */
async function speakServidor(text: string, rate: number) {
  try {
    let url = urlCache.get(text);
    if (!url) {
      const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}`);
      if (!res.ok) return;
      const blob = await res.blob();
      url = URL.createObjectURL(blob);
      urlCache.set(text, url);
    }
    if (fallbackAudio) {
      fallbackAudio.pause();
      fallbackAudio.currentTime = 0;
    }
    const audio = new Audio(url);
    audio.playbackRate = Math.max(0.5, Math.min(1, rate + 0.15));
    fallbackAudio = audio;
    await audio.play().catch(() => {});
  } catch {
    /* silencioso: áudio é opcional */
  }
}

function speakNow(text: string, rate: number) {
  const synth = window.speechSynthesis;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = rate;
  const v = cached ?? findJa();
  if (v) {
    cached = v;
    u.voice = v;
  }
  let saiu = false;
  u.onstart = () => {
    saiu = true;
  };
  const limpar = () => {
    if (keepAlive) {
      clearInterval(keepAlive);
      keepAlive = null;
    }
  };
  u.onend = limpar;
  u.onerror = () => {
    limpar();
    if (!saiu) void speakServidor(text, rate);
  };
  synth.speak(u);

  // se a fala não começar (bug comum no Android/iOS), usa o servidor
  setTimeout(() => {
    if (!saiu && !synth.speaking) void speakServidor(text, rate);
  }, 700);

  if (keepAlive) clearInterval(keepAlive);
  keepAlive = setInterval(() => {
    if (!synth.speaking) {
      limpar();
      return;
    }
    synth.resume();
  }, 4000);
}

export function speakJa(text: string, rate = 0.85) {
  if (!ttsDisponivel() || !text) return;
  pararAudio();

  if (!synthDisponivel()) {
    void speakServidor(text, rate);
    return;
  }

  ensureVoices();
  const synth = window.speechSynthesis;
  synth.resume();

  // cancel() é assíncrono: falar no mesmo tick faz o áudio não sair.
  const start = (tentativa = 0) => {
    const voz = cached ?? findJa();
    if (!voz) {
      // ainda pode estar carregando as vozes; depois disso vai para o servidor
      if (tentativa < 6) {
        setTimeout(() => start(tentativa + 1), 120);
        return;
      }
      void speakServidor(text, rate);
      return;
    }
    speakNow(text, rate);
  };
  setTimeout(() => start(), 60);
}

export function pararAudio() {
  if (!ttsDisponivel()) return;
  if (keepAlive) {
    clearInterval(keepAlive);
    keepAlive = null;
  }
  if (fallbackAudio) {
    fallbackAudio.pause();
    fallbackAudio = null;
  }
  if (synthDisponivel()) window.speechSynthesis.cancel();
}
