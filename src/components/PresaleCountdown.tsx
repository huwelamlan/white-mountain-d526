// src/components/PresaleCountdown.tsx
import { useEffect, useState } from "react";

export default function PresaleCountdown() {
  const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

  // set the initial endTime to "now + 3 days"
  const [endTime, setEndTime] = useState(() => Date.now() + THREE_DAYS_MS);
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (now >= endTime) {
        // If we've passed the old endTime, start a new 3-day cycle
        const newEnd = now + THREE_DAYS_MS;
        setEndTime(newEnd);
        setTimeLeft(newEnd - now);
      } else {
        // otherwise just tick down
        setTimeLeft(endTime - now);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  // Convert ms to days/hours/mins/secs
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <section className="my-8 text-center">
      <h4 className="mb-4 text-2xl font-bold">Presale Countdown</h4>
      <p className="text-lg">Resets <strong>every 3 days</strong></p>
      <div className="mt-2 text-xl">
        <span>{days}d </span>
        <span>{hours}h </span>
        <span>{minutes}m </span>
        <span>{seconds}s</span>
      </div>
    </section>
  );
}
