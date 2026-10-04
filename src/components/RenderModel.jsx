"use client";
import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

export default function RenderModel({ children, className = "", interactive = false }) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const c = document.createElement("canvas");
    try { setAvailable(!!(c.getContext("webgl2") || c.getContext("webgl"))); } catch { setAvailable(false); }
  }, []);
  if (!available) return <div className="scene-fallback">3D 预览需要支持 WebGL 的浏览器</div>;
  return <Canvas className={className} dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 38 }}
    gl={{ antialias: true, powerPreference: "low-power" }} aria-label="开源示例模型的三维预览">
    <ambientLight intensity={1.7} />
    <directionalLight position={[5, 7, 8]} intensity={3.3} color="#f5e8ff" />
    <directionalLight position={[-4, 2, -3]} intensity={2.2} color="#8f65ff" />
    <Suspense fallback={null}>
      <Bounds fit clip observe margin={1.05}>{children}</Bounds>
    </Suspense>
    <OrbitControls enablePan={false} enableZoom={interactive} enableRotate={interactive}
      minPolarAngle={0.4} maxPolarAngle={2.7} />
  </Canvas>;
}

