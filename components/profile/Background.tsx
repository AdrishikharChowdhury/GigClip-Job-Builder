import ColorBends from "../ColorBends";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full opacity-60">
      <ColorBends
        colors={["#4da2ff", "#5c4ade", "#55db9c"]}
        rotation={90}
        speed={0.1}
        scale={1}
        frequency={1}
        warpStrength={1}
        noise={0.08}
        parallax={0.5}
        iterations={1}
        intensity={0.9}
        bandWidth={6}
        transparent
        autoRotate={0}
      />
    </div>
  );
};

export default Background;
