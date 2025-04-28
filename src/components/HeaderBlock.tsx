import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeaderBlock = () => {
  const [position, setPosition] = useState<"left" | "center" | "right">("left");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      if (scrollY + screenHeight >= docHeight - 100) {
        setPosition("right");
      } else if (scrollY > screenHeight / 2) {
        setPosition("center");
      } else {
        setPosition("left");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPositionStyle = () => {
    switch (position) {
      case "left":
        return "justify-start";
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className={`flex ${getPositionStyle()} transition-all duration-700 ease-in-out max-w-6xl mx-auto p-4`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img
        src="https://assets-global.website-files.com/65782009fd8595214ed53f48/6578402f01580d1fafa5e1dd_pexels-alena-darmel-7715760.webp"
        alt="Animated"
        className="rounded-xl shadow-lg"
      />
    </motion.div>
  );
};

export default HeaderBlock;
