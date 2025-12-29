'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, color, speed = 1, distort = 0.3, scale = 1 }: {
    position: [number, number, number];
    color: string;
    speed?: number;
    distort?: number;
    scale?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={speed * 2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

function ParticleField() {
    const count = 100;
    const mesh = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
            mesh.current.rotation.x = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#10B981"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

function GradientSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
                <meshStandardMaterial roughness={0.1} metalness={0.9}>
                    <GradientTexture
                        stops={[0, 0.5, 1]}
                        colors={['#10B981', '#059669', '#047857']}
                        size={1024}
                    />
                </meshStandardMaterial>
            </Sphere>
        </Float>
    );
}

export function Hero3DScene() {
    return (
        <div className="absolute inset-0 -z-10 opacity-30">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#10B981" />

                <GradientSphere />
                <AnimatedSphere position={[-3, 1, -2]} color="#10B981" speed={0.5} scale={0.6} distort={0.4} />
                <AnimatedSphere position={[3, -1, -3]} color="#059669" speed={0.7} scale={0.4} distort={0.5} />
                <AnimatedSphere position={[2, 2, -4]} color="#047857" speed={0.3} scale={0.3} distort={0.3} />
                <ParticleField />
            </Canvas>
        </div>
    );
}

export function FloatingOrb({ className = '' }: { className?: string }) {
    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 3], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <pointLight position={[-5, -5, -5]} intensity={0.3} color="#10B981" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <Sphere args={[0.8, 64, 64]}>
                        <MeshDistortMaterial
                            color="#10B981"
                            attach="material"
                            distort={0.4}
                            speed={2}
                            roughness={0.1}
                            metalness={0.9}
                        />
                    </Sphere>
                </Float>
            </Canvas>
        </div>
    );
}

export function MiniOrb({ color = '#10B981' }: { color?: string }) {
    return (
        <div className="w-16 h-16">
            <Canvas
                camera={{ position: [0, 0, 2.5], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 3, 3]} intensity={0.6} />

                <Float speed={3} rotationIntensity={0.8} floatIntensity={0.5}>
                    <Sphere args={[0.5, 32, 32]}>
                        <MeshDistortMaterial
                            color={color}
                            attach="material"
                            distort={0.5}
                            speed={3}
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </Sphere>
                </Float>
            </Canvas>
        </div>
    );
}
