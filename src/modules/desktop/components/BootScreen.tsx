"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "../hooks/useDesktopStore";

export function BootScreen() {
  const { bootPhase, setBootPhase } = useDesktopStore();

  useEffect(() => {
    const t1 = setTimeout(() => setBootPhase("welcome"), 3000);
    const t2 = setTimeout(() => setBootPhase("ready"), 5500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [setBootPhase]);

  return (
    <AnimatePresence>
      {bootPhase === "booting" && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex gap-0.5">
            {["#f04020", "#40b030", "#2070e0", "#f0c020"].map((c, i) => (
              <motion.div
                key={i}
                className="w-[18px] h-[18px] rounded-sm"
                style={{ background: c }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
          <div
            className="text-white mt-3 text-[22px] tracking-[6px]"
            style={{ fontFamily: "'Franklin Gothic Medium', sans-serif" }}
          >
            Microsoft
          </div>
          <div className="text-gray-500 text-[10px] tracking-wider mt-4">
            Windows XP Professional
          </div>
          <div className="w-[200px] h-1.5 bg-[#111] rounded-full mt-7 overflow-hidden relative">
            <motion.div
              className="absolute top-0 h-full w-2/5 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #3388ff, #55aaff, #3388ff, transparent)",
              }}
              animate={{ left: ["-40%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}

      {bootPhase === "welcome" && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[99998] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #002f87, #0066e0, #002f87)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-white text-[32px] max-md:text-2xl tracking-wide"
            style={{
              fontFamily: "'Franklin Gothic Medium', sans-serif",
              textShadow: "0 0 30px rgba(100,180,255,.4)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            welcome
          </motion.div>
          <motion.div
            className="text-[16px] max-md:text-[13px] tracking-[3px] mt-2 uppercase"
            style={{ fontFamily: "Georgia, serif", color: "#c9a84c" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Wealon Tax & Accounting
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
