import React from 'react';

export function useOnlineStatus () {
    
      const [online, setOnline] = React.useState(navigator.onLine)
        React.useEffect(() => {
          function updateOnline() {
            setOnline(navigator.onLine)
          }
      
          window.addEventListener('online', updateOnline)
          window.addEventListener('offline', updateOnline)
      
          return () => {
            window.removeEventListener('online', updateOnline)
            window.removeEventListener('offline', updateOnline)
          }
        }, [])

      
return online;
}