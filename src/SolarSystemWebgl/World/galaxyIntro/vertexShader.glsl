uniform float uElapsed;
uniform float uSize;
uniform float uTime1;

attribute vec3 aTargetPosition;
attribute float aScale;
attribute float aRadius;
attribute float aDelay;

varying vec3 vColor;

varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.x = aTargetPosition.x * (uTime1 / 1.0);
    modelPosition.y = aTargetPosition.y;
    modelPosition.z = aTargetPosition.z * (uTime1 / 1.0);
    
    // float deltaTime = uTime1 - aDelay;

    // if (deltaTime >= 0.0 && deltaTime < 2.0) {
    //     modelPosition.x += aTargetPosition.x * (deltaTime / 1.0);
    //     modelPosition.y += aTargetPosition.y;
    //     modelPosition.z += aTargetPosition.z * (deltaTime / 1.0);
    // }

    
    // float deltaTime = uTime1 - aDelay;
    // if (deltaTime )


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}