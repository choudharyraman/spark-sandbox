import { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SandboxTimerProps {
  expiresAt: Date;
}

export function SandboxTimer({ expiresAt }: SandboxTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Expired');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      setIsWarning(diff < 15 * 60 * 1000); // Warning at 15 minutes
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <Badge 
      variant={isWarning ? 'destructive' : 'sandbox'}
      className="gap-1.5 font-mono text-xs"
    >
      {isWarning ? (
        <AlertTriangle className="w-3 h-3" />
      ) : (
        <Clock className="w-3 h-3" />
      )}
      {timeRemaining}
    </Badge>
  );
}
