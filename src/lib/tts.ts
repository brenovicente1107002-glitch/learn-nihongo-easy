/** Áudio nativo em japonês usando a voz ja-JP do navegador. */

let cached: SpeechSynthesisVoice | null = null;

function jaVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cached) return cached;
  const voices = window.speechSynthesis.getVoices();
  cached = voices.find((v) => v.lang.replace("_", "-").toLowerCase().startsWith("ja")) ?? null;
  return cached;
}

export function ttsDisponivel(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speakJa(text: string, rate = 0.85) {
  if (!ttsDisponivel() || !text) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = rate;
  const v = jaVoice();
  if (v) u.voice = v;
  synth.speak(u);
}

export function pararAudio() {
  if (ttsDisponivel()) window.speechSynthesis.cancel();
}
