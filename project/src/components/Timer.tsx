import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  startTime: number;
  endTime: number | null;
  isActive: boolean;
}

export default function Timer({ startTime, endTime, isActive }: TimerProps) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const elapsed = endTime ? endTime - startTime : currentTime - startTime;
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formatTime = () => {
    if (hours > 0) {
      return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 text-slate-600">
      <Clock className="w-4 h-4" />
      <span className="font-mono text-sm font-medium">
        {formatTime()}
      </span>
    </div>
  );
}