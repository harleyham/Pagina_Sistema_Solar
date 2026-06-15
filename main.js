// Configuração inicial da cena Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Adicionar partículas estelares
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 10000;
const posArray = new Float32Array(starsCount * 3);

for(let i = 0; i < starsCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 500;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const starsMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xffffff
});
const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starsMesh);

// Adicionar um planet
const planetGeometry = new THREE.SphereGeometry(5, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({
    color: 0x2a8a2a,
    emissive: 0x1a4a1a,
    shininess: 10
});
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.set(-15, 0, -20);
scene.add(planet);

// Adicionar uma lua
const moonGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    shininess: 20
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(7, 0, 0);
moon.userData = { rotationSpeed: 0.01 };
scene.add(moon);

// Adicionar luz
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 10, 10);
scene.add(pointLight);

// Configurar câmera
camera.position.z = 30;

// Adicionar órbita visual
const orbitGeometry = new THREE.RingGeometry(20, 20.5, 64);
const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0x333333,
    side: THREE.DoubleSide
});
const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
orbit.rotation.x = Math.PI / 2;
scene.add(orbit);

// Adicionar órbita visual da lua
const moonOrbitGeometry = new THREE.RingGeometry(8, 8.5, 64);
const moonOrbitMaterial = new THREE.MeshBasicMaterial({
    color: 0x222222,
    side: THREE.DoubleSide
});
const moonOrbit = new THREE.Mesh(moonOrbitGeometry, moonOrbitMaterial);
moonOrbit.rotation.x = Math.PI / 2;
moonOrbit.position.set(-15, 0, -20);
scene.add(moonOrbit);

// Adicionar animação das estrelas
let starRotation = 0;

// Adicionar anel giratório
const ringGeometry = new THREE.TorusGeometry(8, 0.3, 16, 100);
const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x4a90e2
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = Math.PI / 2;
ring.position.set(20, 5, -25);
scene.add(ring);

// Adicionar animação de rotação do anel
let ringRotation = 0;

// Adicionar animação do planeta giratório
let planetRotation = 0;

// Adicionar animação da lua
let moonAngle = 0;

// Loop de animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação das estrelas
    starsMesh.rotation.y += 0.0001;

    // Rotação do planeta
    planet.rotation.y += 0.002;

    // Rotação da lua
    moonAngle += 0.01;
    moon.position.x = -15 + Math.cos(moonAngle) * 7;
    moon.position.z = -20 + Math.sin(moonAngle) * 7;

    // Rotação do anel
    ring.rotation.x += 0.002;
    ring.rotation.y += 0.001;

    // Rotação do anel em relação ao centro
    ring.position.y = 5 + Math.sin(Date.now() * 0.001) * 2;

    renderer.render(scene, camera);
}

animate();

// Redimensionar a janela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});