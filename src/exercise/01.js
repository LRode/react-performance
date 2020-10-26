// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import React from 'react'
/* With webpackPrefetch the browser will automatically load this JavaScript file into the browser cache so it’s ready ahead of time.*/
const Globe = React.lazy(() => import(/* webpackPrefetch: true */ '../globe'))

// 🐨 use React.lazy to create a Globe component which using a dynamic import
// to get the Globe component from the '../globe' module.

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false)

  // 🐨 wrap the code below in a <React.Suspense /> component
  // with a fallback.
  // 💰 try putting it in a few different places and observe how that
  // impacts the user experience.
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
      }}
    >
    {/*
      * The idea here is that we can load in the import as soon as the user has shown they will want to see the globe.
      * If you know for sure that the user will want this code, one idea would be to load it in a useEffect() after the component mounts
     */}
      <label style={{marginBottom: '1rem'}} onMouseEnter={() => {
        import(/* webpackPrefetch: true */ '../globe');
      }}>
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={e => setShowGlobe(e.target.checked)}
        />
        {' show globe'}
      </label>
      <div style={{width: 400, height: 400}}>
        {showGlobe ? (
          <React.Suspense fallback={<div>loading...</div>}>
            <Globe />
          </React.Suspense>
        ) : null}
      </div>
    </div>
  )
}
// 🦉 Note that if you're not on the isolated page, then you'll notice that this
// app actually already has a React.Suspense component higher up in the tree
// where this component is rendered, so you *could* just rely on that one.

export default App
