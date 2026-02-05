
export const BackgroundShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragment: `
    uniform float uTime;
    varying vec2 vUv;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      float d = length(p);
      vec3 color = vec3(0.02, 0.02, 0.03); // Deep base
      
      // Moving nebula-like noise
      float n = noise(vUv + uTime * 0.05);
      color += vec3(0.1, 0.0, 0.0) * (1.0 - d) * n * 0.2;
      
      // Vignette
      color *= (1.0 - d * 0.5);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

export const NodeShader = {
  vertex: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragment: `
    uniform vec3 uColor;
    uniform float uIntensity;
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Fresnel effect
      float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
      
      // Pulsing center
      float pulse = 0.8 + 0.2 * sin(uTime * 3.0);
      
      vec3 finalColor = uColor * (fresnel + 0.2) * uIntensity * pulse;
      
      gl_FragColor = vec4(finalColor, fresnel * 0.8 + 0.1);
    }
  `
};

export const EdgeShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragment: `
    uniform float uTime;
    uniform float uActive;
    varying vec2 vUv;

    void main() {
      float dash = step(0.5, fract(vUv.x * 10.0 - uTime * 2.0));
      float alpha = dash * 0.3 * uActive;
      vec3 color = mix(vec3(1.0), vec3(1.0, 0.0, 0.0), uActive);
      gl_FragColor = vec4(color, alpha);
    }
  `
};
