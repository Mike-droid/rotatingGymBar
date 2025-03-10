import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if (WebGL.isWebGL2Available()) {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Create a group for the barbell
	const barbellGroup = new THREE.Group();

	// Create the capsule (bar)
	const capsuleGeometry = new THREE.CapsuleGeometry(1.2, 50, 50, 50);
	const capsuleMaterial = new THREE.MeshBasicMaterial({ color: 0xc6c6c6 });
	const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
    capsule.rotation.z = Math.PI / 2; // Rotate the capsule to look horizontal
	barbellGroup.add(capsule);

	// Create the first torus (weight plate)
	const torusGeometry1 = new THREE.TorusGeometry(4.3, 3.5, 20);
	const torusMaterial1 = new THREE.MeshBasicMaterial({ color: 0xf90404 });
	const torus1 = new THREE.Mesh(torusGeometry1, torusMaterial1);
	torus1.position.x = 17; // Set position relative to the bar
    torus1.rotation.y = Math.PI / 2; // Rotate the torus to look connected to the bar
	barbellGroup.add(torus1);

	// Create the second torus (weight plate)
	const torusGeometry2 = new THREE.TorusGeometry(4.3, 3.5, 20);
	const torusMaterial2 = new THREE.MeshBasicMaterial({ color: 0xf90404 });
	const torus2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
	torus2.position.x = -17; // Set position relative to the bar
    torus2.rotation.y = Math.PI / 2; // Rotate the torus to look connected to the bar
	barbellGroup.add(torus2);

	// Add the entire barbell group to the scene
	scene.add(barbellGroup);

	camera.position.z = 50;

	// Animation loop
	let angle = 0;
	function animate() {
		angle += 0.02; // speed of movement animation

		// Rotate the entire barbell group around the Y-axis
		barbellGroup.rotation.y = angle;

		renderer.render(scene, camera);
	}

	renderer.setAnimationLoop(animate);
} else {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById('container').appendChild(warning);
}
