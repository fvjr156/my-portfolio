import type { XCenteredLayoutProps } from "../types/Types";
import Particles from "./Particles";

export default function XCenteredLayout({
  children,
  herobg = false,
  particles = false,
}: XCenteredLayoutProps) {
  return (
    <div
      className={`
        relative
        ${herobg ? "bg-hero bg-cover bg-no-repeat" : ""}
        ${
          particles &&
          `
              before:content=[''] before:absolute
              before:-top-1 before:left-0
              before:w-full before:h-3
              before:bg-transparent
              before:backdrop-blur-sm before:z-1
              before:rounded-t-2xl
            `
        } 
        flex flex-row
        justify-center items-center
      `}
    >
      {particles && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={["#8d0909"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
          />
        </div>
      )}
      <div
        className={`
          relative w-full h-full
          `}
      >
        {children}
      </div>
    </div>
  );
}
