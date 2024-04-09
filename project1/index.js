import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60, //시야각
  window.innerWidth / window.innerHeight, //가로 세로 비율
  0.1, //카메라에 가까운 부분 렌더링 거리 제한
  100 //카메라에서 멀리 떨어진 부분 렌더링 거리 제한
);

// const geometry = new THREE.BoxGeometry(5, 5, 5); // 물체
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 1, roughness: 0.1 });
// const mesh = new THREE.Mesh(geometry, material); // 물체에 재질 입히기
// scene.add(mesh); // 물체를 씬에 추가

// Ambient Light 추가
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 주변광
// scene.add(ambientLight);

// Directional Light 추가
const directionalLight = new THREE.DirectionalLight(0xf2eee5, 5);
scene.add(directionalLight);

const underDirectionalLight = new THREE.DirectionalLight(0x99ccff, 1);
underDirectionalLight.position.set(0, -10, 0);
scene.add(underDirectionalLight);

// 비행기 추가
const loader = new GLTFLoader();
loader.load(
  "./boeing_787_dreamliner/scene.gltf",
  function (gltf) {
    scene.add(gltf.scene);
  },
  function() {
    console.log("로딩중");
  },
  function (error) {
    console.log(error);
  }
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio*4);

document.body.appendChild(renderer.domElement);


let radius = 50; // 카메라가 중심으로부터 떨어진 반지름
let speed = 0.0004; // 회전 속도

function resizeRendererToDisplaySize(){
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio*4);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resizeRendererToDisplaySize);



function animate() {
  requestAnimationFrame(animate);

  let time = Date.now() * speed; // 시간에 따라 변화

  camera.position.x = Math.sin(time) * radius;
  camera.position.z = Math.cos(time) * radius;

  camera.lookAt(scene.position); // 항상 씬의 중심을 바라보게 함

  // directionalLight.position.set(10, 10, 0); // 위에서 아래로 빛을 비춤
  // directionalLight.lookAt(scene.position); // 항상 씬의 중심을 바라보게 함

  // 씬 렌더링
  renderer.render(scene, camera);
}

animate();
