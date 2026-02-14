import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ValentinePage() {
  const [answer, setAnswer] = useState(null);
  const [noClicks, setNoClicks] = useState(0);
  const [yesPosition, setYesPosition] = useState({ top: 200, left: 180 });
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [size, setSize] = useState(1);
  const [showHearts, setShowHearts] = useState(false);
  const [intro, setIntro] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const audioRef = useRef(null);

  const randomPos = () => ({
    top: Math.random() * 350,
    left: Math.random() * 350
  });

  useEffect(() => {
    setNoPosition(randomPos());
    const introTimer = setTimeout(() => {
      setIntro(false);
      setShowPhoto(true);
    }, 4000);

    const photoTimer = setTimeout(() => {
      setShowPhoto(false);
    }, 11000);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(photoTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!answer && !intro) {
        setYesPosition(randomPos());
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [answer, intro]);

  const chaosNo = () => {
    setNoClicks((prev) => prev + 1);
    setNoPosition(randomPos());
    setSize((prev) => Math.max(0.35, prev - 0.07));
  };

  const handleYes = () => {
    setAnswer("yes");
    setShowHearts(true);
  };

  const playMusic = () => {
    if (audioRef.current) audioRef.current.play();
  };

  return (
    <div
      onClick={playMusic}
      className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden"
    >
      {/* Cinematic Black Bars */}
      <div className="absolute top-0 left-0 w-full h-16 bg-black z-50" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-black z-50" />

      <audio
        ref={audioRef}
        loop
        src="https://www.bensound.com/bensound-music/bensound-romantic.mp3"
      />

      {/* Netflix Style Intro */}
      <AnimatePresence>
        {intro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black z-40 text-center px-6"
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-widest text-red-600"
            >
              A NETFLIX ORIGINAL
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-6 text-2xl text-gray-300"
            >
              This Valentine, one girl changes everything...
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="mt-10 text-4xl md:text-6xl font-bold text-pink-500"
            >
              Adellia Putri 💕
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {showPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 flex items-center justify-center bg-black z-30"
        >
          <motion.img
            src="/adellia.jpg"
            alt="Adellia Putri"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 8 }}
            className="max-w-[80%] max-h-[80%] rounded-3xl shadow-[0_0_80px_rgba(255,105,180,0.9)]"
          />
          <div className="absolute bottom-32 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-pink-400">
              Every love story has a beginning...
            </h2>
          </div>
        </motion.div>
      )}

      {!intro && !showPhoto && (
        <Card className="w-full max-w-4xl text-center shadow-2xl rounded-2xl bg-gradient-to-br from-rose-900 to-pink-800 relative overflow-hidden border border-pink-500">
          <CardContent className="p-16 relative h-[600px]">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-extrabold mb-6"
            >
              WILL YOU BE MY VALENTINE 💖
            </motion.h1>

            {answer === "yes" ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-5xl font-bold text-pink-300"
              >
                💍 THE BEGINNING OF US 💕
                <div className="mt-6 text-2xl">
                  14 Februari 2026 — Now Streaming Forever 🎬✨
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="absolute"
                  style={{ top: yesPosition.top, left: yesPosition.left }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Button
                    onClick={handleYes}
                    className="text-xl px-12 py-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-2xl"
                  >
                    YES 💝
                  </Button>
                </motion.div>

                <motion.div
                  className="absolute"
                  style={{
                    top: noPosition.top,
                    left: noPosition.left,
                    transform: `scale(${size})`
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <Button
                    onMouseEnter={chaosNo}
                    onClick={chaosNo}
                    variant="secondary"
                    className="text-lg px-8 py-4 rounded-2xl"
                  >
                    {noClicks === 0 && "ARE YOU SURE? 😏"}
                    {noClicks === 1 && "Think again 😈"}
                    {noClicks === 2 && "Plot twist? 👀"}
                    {noClicks === 3 && "No escape... 🎬"}
                    {noClicks >= 4 && "Destiny says YES 💕"}
                  </Button>
                </motion.div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
