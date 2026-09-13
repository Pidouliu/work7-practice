const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 8, 18);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.25));
const sunLight = new THREE.PointLight(0xffffff, 2, 100);
scene.add(sunLight);

const sun = new THREE.Mesh( 
    new THREE.SphereGeometry(2 , 32 , 32), 
    new THREE.MeshBasicMaterial({ color : 0xffcc33 })
);
scene.add(sun);

// 地球：用 Group 当公转轨道的圆心
const earthPivot = new THREE.Group();
scene.add(earthPivot);
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x3377ff, roughness: 0.6 })
);
earth.position.x = 6;
earthPivot.add(earth);

// 月球：挂在地球上，随地球公转同时绕地球转
const moonPivot = new THREE.Group();
earth.add(moonPivot);
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.22, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0xcccccc })
);
moon.position.x = 1.5;
moonPivot.add(moon);

// 土星 + 扁平光环
const saturnPivot = new THREE.Group();
scene.add(saturnPivot);
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(1.3, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xd8b98a })
);
saturn.position.x = 11;
saturnPivot.add(saturn);

const ring = new THREE.Mesh(
  new THREE.RingGeometry(1.7, 2.4, 48),
  new THREE.MeshStandardMaterial({ color: 0xc9a86c, side: THREE.DoubleSide })
);
ring.rotation.x = Math.PI / 2.5;
saturn.add(ring);

const animate = ( ) => { 
  requestAnimationFrame(animate);
  sun.rotation.y += 0.003;
  renderer.render(scene, camera);
  earthPivot.rotation.y += 0.01;
  earth.rotation.y += 0.02;
  moonPivot.rotation.y += 0.05;
  saturnPivot.rotation.y += 0.006;
};
animate();

window.addEventListener( 'resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});