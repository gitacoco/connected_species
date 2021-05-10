class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    distanceTo(p) {
      return Math.sqrt(Math.pow((this.x - p.x), 2) + Math.pow((this.y - p.y), 2));
    }

    toString() {
      return `${this.x} ${this.y}`;
    }
  }

  function toScreenPosition(obj, camera) {
    const vector = new THREE.Vector3();

    const widthHalf = 0.5 * document.documentElement.clientWidth;
    const heightHalf = 0.5 * document.documentElement.clientHeight;

    obj.updateMatrixWorld();

    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    if (vector.z < 0 || vector.z > 1) {
      return null;
    }

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
    return { 
      x: vector.x,
      y: vector.y
    };
  };

  const limitCamera = new THREE.PerspectiveCamera(100, 1, 1, 110);
  
  const panorama = new PANOLENS.ImagePanorama('../assets/textures/equirectangular/field.jpg');
  const viewer = new PANOLENS.Viewer({
    controlBar: false,  
    cameraFov: 130,
    output: 'console'
  });
  const camera = viewer.getCamera();
  
  function startPanoPic() {
    viewer.add(panorama);
    viewer.tweenControlCenter( new THREE.Vector3(-40, -950, 0), 1000 );
  }
  
  const pos3D = [
    [-5000, 3206, 2486],
    [-5000, 151.45, -1767.63],
    [-5000, 2597, 784],
    [-3570, 1136, -5000],
    [-5000, 2415, -1991],
    [-3340, 1290, 5000],
    [-3570, 1136, -5000],
    [-5000, 2415, -1991],
    [-3340, 1290, 5000]
  ];

  const infospots = [];
  const targets = (() => {
    const chartHeight = 2 * config.galleryRadius;
    const y = document.documentElement.clientHeight - chartHeight / 2 - 250;
    const ret = [];
    const width = document.documentElement.clientWidth / pos3D.length;
    const start = 0 - document.documentElement.clientWidth / pos3D.length / 2;

    for (let i = 0; i < pos3D.length; i += 1) {
      ret.push({ x: start + (i + 1) * width * 0.63 + 90, y});
    }

    return ret;
  })();

  for (let i = 0; i < pos3D.length; i += 1) {
    const from = new THREE.Vector3(...pos3D[i]);
    infospot = new PANOLENS.Infospot( 0.0001, PANOLENS.DataImage.Info );
    infospot.position.copy(from);
    infospot.addHoverText('Infospot ' + i);
    panorama.add(infospot);
    infospots.push(infospot);
  }

  function clearFake3DLines() {
    document.getElementById('myframe').contentWindow.document.getElementById('3d-lines').innerHTML = '';
  }

  function getBezierPoint(top, bottom) {
    const base = 0.02;
    const x = (bottom.x - top.x) * 0.6 + top.x;
    const y = top.y + top.distanceTo(bottom) * base;

    return new Point(x, y);
  }

  function drawFake3DLine(from, to) {
    const leftTop = new Point(from.x - 5, from.y);
    const rightTop = new Point(from.x + 5, from.y);
    const leftBottom = new Point(to.x - 20, to.y);
    const rightBottom = new Point(to.x + 20, to.y);

    const leftQ = getBezierPoint(leftTop, leftBottom);
    const rightQ = getBezierPoint(rightTop, rightBottom);

    document.getElementById('myframe').contentWindow.document.getElementById('3d-lines').innerHTML += `
      <path d="M${leftTop} L${rightTop} Q${rightQ} ${rightBottom} L${leftBottom} Q${leftQ} ${leftTop} Z" class="fake3DLine" />
    `;
  }

  function render() {
    requestAnimationFrame(() => {
      clearFake3DLines();

      for (let i = 0; i < pos3D.length; i += 1) {
        const from = toScreenPosition(infospots[i], camera);
        if (from === null) {
          continue
        }
        
        const to = targets[i];
        drawFake3DLine(from, to);
      }

      render();
    });
  }

  function clearScene() {
    while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
}
  }