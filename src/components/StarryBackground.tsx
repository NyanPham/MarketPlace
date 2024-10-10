import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm'

type Rotation = {
  rotation: {
    x: number
    y: number
  }
}

const Stars = (props: any) => {
  const ref = useRef<Rotation | null>(null)
  const sphere = random.inSphere(new Float32Array(2300), { radius: 1.2 })

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#0E17CC" size={0.007} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

const StarryBackground = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-[-1] bg-universe">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default StarryBackground
