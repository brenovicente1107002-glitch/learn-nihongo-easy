/** Áudio nativo em japonês usando a voz ja-JP do navegador. */

let cached: SpeechSynthesisVoice | null = null;
let listening = false;
let keepAlive: ReturnType<typeof setInterval> | null = null;

export function ttsDisponivel(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function findJa(): SpeechSynthesisVoice | null {
  if (!ttsDisponivel()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const ja = voices.filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith("ja"));
  if (!ja.length) return null;
  // prefere vozes locais (mais rápidas e confiáveis offline)
  return ja.find((v) => v.localService) ?? ja[0] ?? null;
}

/** As vozes chegam de forma assíncrona no Chrome/Safari: escuta o evento. */
function ensureVoices() {
  if (!ttsDisponivel() || listening) return;
  listening = true;
  cached = findJa();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    cached = findJa();
  });
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
  u.onend = () => {
    if (keepAlive) {
      clearInterval(keepAlive);
      keepAlive = null;
    }
  };
  synth.speak(u);
  // contorna o bug do Chrome que pausa falas longas
  if (keepAlive) clearInterval(keepAlive);
  keepAlive = setInterval(() => {
    if (!synth.speaking) {
      if (keepAlive) clearInterval(keepAlive);
      keepAlive = null;
      return;
    }
    synth.resume();
  }, 4000);
}

export function speakJa(text: string, rate = 0.85) {
  if (!ttsDisponivel() || !text) return;
  ensureVoices();
  const synth = window.speechSynthesis;
  synth.cancel();
  synth.resume();

  // cancel() é assíncrono: falar no mesmo tick faz o áudio não sair.
  const start = (tentativa = 0) => {
    if (!cached && !findJa() && tentativa < 10) {
      setTimeout(() => start(tentativa + 1), 120);
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
  window.speechSynthesis.cancel();
}
