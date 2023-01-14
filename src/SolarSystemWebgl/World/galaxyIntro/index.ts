/**
 * Stopped.
 * Resume after studying shader.
 */

// import {
//   AdditiveBlending,
//   BufferAttribute,
//   BufferGeometry,
//   Color,
//   MultiplyBlending,
//   NormalBlending,
//   Points,
//   PointsMaterial,
//   Scene,
//   ShaderMaterial,
//   SubtractiveBlending,
// } from "three";
// import gsap from "gsap";
// import DevOnly from "../../systems/DevOnly";

// import vertexShader from "./vertexShader.glsl";
// import fragmentShader from "./fragmentShader.glsl";
// import Sizes from "../../systems/Sizes";

// export default function createGalaxyIntro(sizes: Sizes, scene: Scene) {
//   const gui = DevOnly.getInstance().getGUI();
//   const parameters = {
//     minRadius: 10,
//     maxRadius: 16,
//     size: 100,
//     count: 10000,
//     // randomness: 0.5,
//     // randomnessPower: 3,
//     insideColor: "#9553e5",
//     outsideColor: "#0054a6",
//   };
//   let geometry: BufferGeometry;
//   let material: ShaderMaterial;
//   let points: Points;
//   const generateGalaxy = () => {
//     if (points && geometry && material) {
//       geometry.dispose();
//       material.dispose();
//       scene.remove(points);
//       //remove from the scene
//     }

//     /**
//      * Geometry
//      */
//     geometry = new BufferGeometry();

//     const positions = new Float32Array(parameters.count * 3);
//     const targetPositions = new Float32Array(parameters.count * 3);
//     const colors = new Float32Array(parameters.count * 3);
//     const scales = new Float32Array(parameters.count * 1);
//     const radiuses = new Float32Array(parameters.count * 1);
//     const delays = new Float32Array(parameters.count * 1);

//     const insideColor = new Color(parameters.insideColor);
//     const outsideColor = new Color(parameters.outsideColor);

//     for (let i = 0; i < parameters.count; i++) {
//       const i3 = i * 3;
//       // Position
//       positions[i3] = 0;
//       positions[i3 + 1] = 0;
//       positions[i3 + 2] = 0;

//       // Target Position
//       const rRadian = Math.random() * Math.PI * 2;
//       const rRadius = Math.random() * (parameters.maxRadius + parameters.minRadius) + parameters.minRadius;
//       const rY = Math.random() * 2 - 1;
//       // const randomX = Math.random();
//       // const randomY = Math.random();
//       // const randomZ = Math.random();
//       targetPositions[i3] = rRadius * Math.cos(rRadian);
//       targetPositions[i3 + 1] = rY;
//       targetPositions[i3 + 2] = rRadius * Math.sin(rRadian);

//       // Color
//       const mixedColor = insideColor.clone();
//       mixedColor.lerp(outsideColor, parameters.maxRadius / 16);

//       colors[i3] = mixedColor.r;
//       colors[i3 + 1] = mixedColor.g;
//       colors[i3 + 2] = mixedColor.b;

//       scales[i] = Math.random();
//       radiuses[i] = rRadius;
//       delays[i] = 6;
//     }

//     geometry.setAttribute("position", new BufferAttribute(positions, 3));
//     geometry.setAttribute("color", new BufferAttribute(colors, 3));
//     geometry.setAttribute("aTargetPosition", new BufferAttribute(targetPositions, 3));
//     geometry.setAttribute("aScale", new BufferAttribute(scales, 1));
//     geometry.setAttribute("aRadius", new BufferAttribute(radiuses, 1));
//     geometry.setAttribute("aDelay", new BufferAttribute(delays, 1));

//     /**
//      * Material
//      */
//     material = new ShaderMaterial({
//       depthWrite: false,
//       blending: AdditiveBlending,
//       vertexColors: true,
//       vertexShader,
//       fragmentShader,
//       uniforms: {
//         uSize: { value: parameters.size * sizes.getSizes().pixelRatio },
//         uTime1: { value: 0 },
//         uElapsed: { value: 0 },
//       },
//     });

//     gsap.to(material.uniforms.uTime1, {
//       duration: 10.0,
//       value: 10.0,
//     });

//     /**
//      * Points
//      */
//     points = new Points(geometry, material);
//     scene.add(points);
//     /**
//      * Tick
//      */
//     const tick = (elapsed: number, delta: number) => {
//       // material.uniforms.uElapsed.value = elapsed;
//     };
//     return { tick };
//   };
//   const { tick } = generateGalaxy();

//   gui.add(parameters, "size").min(10).max(1000).step(1).onFinishChange(generateGalaxy);
//   gui.add(parameters, "count").min(10).max(50000).step(100).onFinishChange(generateGalaxy);
//   gui.add(parameters, "maxRadius").min(1).max(16).step(1).onFinishChange(generateGalaxy);
//   // gui.add(parameters, "randomness").min(0).max(2).step(0.001).onFinishChange(generateGalaxy);
//   // gui.add(parameters, "randomnessPower").min(1).max(10).step(0.001).onFinishChange(generateGalaxy);
//   gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
//   gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

//   return { tick };
// }
