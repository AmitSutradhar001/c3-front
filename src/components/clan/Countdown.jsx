import { useState, useEffect } from "react";

const Countdown = ({ contest }) => {
  const calculateTimeLeft = () => {
    const targetDate = new Date(contest?.date || "2024-12-31T23:59:59"); // Example target date
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="bg-[#F9F9F9] p-5 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Time Left</h2>
      <div className="flex space-x-3">
        <div className="text-center">
          <div className="bg-white p-3 rounded-lg text-2xl font-semibold">
            {timeLeft.days || 0}
          </div>
          <div className="mt-1 text-sm font-semibold">Days</div>
        </div>
        <div className="text-center">
          <div className="bg-white p-3 rounded-lg text-2xl font-semibold">
            {timeLeft.hours || 0}
          </div>
          <div className="mt-1 text-sm font-semibold">Hrs</div>
        </div>
        <div className="text-center">
          <div className="bg-white p-3 rounded-lg text-2xl font-semibold">
            {timeLeft.minutes || 0}
          </div>
          <div className="mt-1 text-sm font-semibold">Min</div>
        </div>
        <div className="text-center">
          <div className="bg-white p-3 rounded-lg text-2xl font-semibold">
            {timeLeft.seconds || 0}
          </div>
          <div className="mt-1 text-sm font-semibold">Sec</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
