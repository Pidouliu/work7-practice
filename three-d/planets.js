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

const animate = ( ) => { 
  requestAnimationFrame(animate);
  sun.rotation.y += 0.003;
  renderer.render(scene, camera);
};
animate();

window.addEventListener( 'resize' , () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});