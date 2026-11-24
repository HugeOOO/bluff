// Deadlines keep the countdown accurate when browser timers are throttled.
export function createDiscussionTimer(seconds, now = Date.now) {
  let remaining = seconds * 1000;
  let deadline = null;
  function read() {
    const ms = deadline === null ? remaining : Math.max(0, deadline - now());
    if (ms === 0) { remaining = 0; deadline = null; }
    return { seconds: Math.ceil(ms / 1000), running: deadline !== null };
  }
  return {
    read,
    toggle() {
      if (read().running) { remaining = Math.max(0, deadline - now()); deadline = null; }
      else if (remaining > 0) deadline = now() + remaining;
      return read();
    },
    reset() { remaining = seconds * 1000; deadline = null; return read(); }
  };
}
