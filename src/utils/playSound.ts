export const playSound = (soundUrl: string) => {
  const audio = new Audio(soundUrl);
  audio.play().catch((error) => console.error("Failed to play sound:", error));
};
