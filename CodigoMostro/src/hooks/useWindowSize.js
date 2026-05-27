import React from 'react'

export function useWindowSize () {
      const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

        React.useEffect(() => {
          function resize() {
            setWindowWidth(window.innerWidth)
          }
      
          window.addEventListener('resize', resize)
      
          return () => {
            window.removeEventListener('resize', resize)
          }
        }, [])

      return windowWidth;
}