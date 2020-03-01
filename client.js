// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Location, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToLocation(
    r360.createRoot('ConnectedCryptoModel', { /* initial props */ }),
    new Location([0,-7,-17]),
  );

  const leftPanel = new Surface(700, 600, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.9, 0);

  r360.renderToSurface(
    r360.createRoot('ConnectedLeftPanel'),
    leftPanel,
  );

  const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  rightPanel.setAngle(0.8, 0);

  r360.renderToSurface(
    r360.createRoot('ConnectedRightPanel'),
    rightPanel,
  );

  const centerPanel = new Surface(500, 400, Surface.SurfaceShape.Clylinder);
  centerPanel.setAngle(0, -7);

  r360.renderToSurface(
    r360.createRoot('ConnectedCenterPanel'),
    centerPanel,
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

window.React360 = {init};
