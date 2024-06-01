import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

function Parallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "70vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.h1
        className="display-1"
        style={{
          display: "flex",
          alignItems: "center",
          y: textY,
          color: "#F0F0F0",
          fontWeight: "bold",
          position: "relative",
          zIndex: 10,
        }}
      >
        MILAGE <span style={{ color: "#FFA500" }}>.</span>
      </motion.h1>
      <motion.div
        style={{
          y: backgroundY,
          position: "absolute",
          top: -80,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: `url(/images/parallax-home/background-layer.webp)`,
        }}
      ></motion.div>
      <div
        style={{
          position: "absolute",
          top: -80,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 20,
          backgroundImage: `url(/images/parallax-home/foreground-layer.webp)`,
        }}
      ></div>
    </div>
  );
}

export default Parallax;