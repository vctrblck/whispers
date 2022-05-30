// index.js --- Whispers modules entry point

// Libraries:

//import * as THREE from './../lib/three/build/three';
// `three.js'

// Modules:

import Renderer from './Renderer.js';
import Scene from './levels/3/Scene.js';

// Code:

var container = document.getElementById('canvas');
console.log(container);
// Renderer

var rendererColour = '#EEEEEE';
var rendererWidth = window.innerWidth;
var rendererHeight = window.innerHeight;
var renderer = new Renderer(
  container,
  rendererColour,
  rendererWidth,
  rendererHeight
);

// Scene

var scene = new Scene(renderer);

var fogColour = '#444444';
var fogNear = 0.015;
var fogFar = 100;
var fog = new THREE.Fog(fogColour, fogNear, fogFar);
scene.fog = fog;

// First Person Camera

// Animation

scene.animate();

// index.js ends here
