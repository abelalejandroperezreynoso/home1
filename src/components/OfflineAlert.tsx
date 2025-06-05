import React from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineAlert() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow-lg">
      <div className="flex items-center">
        <WifiOff className="h-5 w-5 text-yellow-400 mr-2" />
        <div>
          <p className="text-sm text-yellow-700">
            Modo sin conexión. Los cambios se sincronizarán cuando vuelva la conexión.
          </p>
        </div>
      </div>
    </div>
  );
}