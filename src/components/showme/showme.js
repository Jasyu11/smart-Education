// npm install @google/model-viewer

import React from "react"
import "@google/model-viewer/dist/model-viewer"


const Showme = () => {
    return (
        <div id="card" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <model-viewer
          src="https://api.readyplayer.me/v1/avatars/63574aefb445da7aa57ae08c.glb"
          ios-src=""
          alt="A 3D model of you"
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
        />
      </div>
    )
}


export default Showme;