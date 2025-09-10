import { motion } from "framer-motion";

function ActiveIndicator() {
  return (
    <motion.span
      layoutId="active-underline"
      className="absolute -bottom-2 left-0 right-0 mx-auto h-0.5 w-8 rounded-full bg-primary"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
}

export default ActiveIndicator;
