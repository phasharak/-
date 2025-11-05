import React, { useState, useRef, useEffect } from "react";

export default function LoyKrathongOnlineFSSNU() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("ขอให้ทุกคนมีความสุข สมหวัง และปลอดภัยตลอดปีการศึกษา");
  const [krathongs, setKrathongs] = useState([]);
  const [time, setTime] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newKrathong = {
      id: Date.now(),
      name: name.trim(),
      wish: wish.trim(),
      baseX: 15 + Math.random() * 70,
      baseBottom: 8 + Math.random() * 10,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.5,
    };

    setKrathongs((prev) => [...prev.slice(-7), newKrathong]);
    setName("");
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // ใช้ user interaction ให้แน่ใจว่าเสียงเล่นได้จริง
      audio.currentTime = 0;
      audio.volume = 0.8;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play blocked:", err);
          alert("⚠️ กรุณาแตะปุ่มเปิดเพลงอีกครั้งเพื่อเริ่มเล่นเพลง");
        });
    }
  };

  useEffect(() => {
    let frame;
    const animate = () => {
      setTime((t) => t + 0.03);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const getKrathongColor = (k) => {
    const hue = (time * 25 + k.phase * 80) % 360;
    return `hsl(${hue}, 70%, 45%)`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-sky-900 to-slate-950 flex items-center justify-center px-4 py-8 overflow-x-hidden">
      {/* เพลงวันเพ็ญเดือนสิบสอง (ไฟล์เสียงแท้จาก CDN ที่เล่นได้จริง) */}
      <audio
        ref={audioRef}
        loop
        controls
        preload="auto"
        playsInline
        src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Thai_Traditional/Loy_Krathong/Loy_Krathong.mp3"
      />

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl border border-sky-500/30 p-6 md:p-8 space-y-6">
          <h1 className="text-3xl font-bold text-white text-center sm:text-left leading-snug">
            ลอยกระทงออนไลน์
            <span className="block text-sky-300 text-xl mt-1">
              คณะสังคมศาสตร์ มหาวิทยาลัยนเรศวร
            </span>
          </h1>
          <p className="text-slate-200 text-sm text-center sm:text-left">
            พิมพ์ชื่อและคำอธิษฐานของคุณ แล้วกด “ลอยกระทง” เพื่อให้กระทงของคุณลอยบนสายน้ำใต้แสงจันทร์พร้อมเสียงเพลงวันเพ็ญเดือนสิบสอง 🎶
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ชื่อของคุณ"
              className="w-full rounded-2xl border border-sky-500/50 bg-slate-950/60 px-4 py-2.5 text-sm text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-sky-500/50 bg-slate-950/60 px-4 py-2.5 text-sm text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="เขียนคำอธิษฐานของคุณที่นี่"
            />
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="submit"
                className="rounded-2xl bg-sky-400/90 hover:bg-sky-300 text-slate-950 px-5 py-2.5 font-semibold shadow-lg text-sm"
              >
                🐘 ลอยกระทง
              </button>
              <button
                type="button"
                onClick={toggleMusic}
                className="rounded-2xl border border-sky-400/60 text-sky-100 px-4 py-2 text-xs sm:text-sm bg-slate-900/60 hover:bg-slate-800/80"
              >
                {isPlaying ? "🔊 หยุดเพลง" : "🎵 เปิดเพลงวันเพ็ญเดือนสิบสอง"}
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-96 rounded-3xl overflow-hidden border border-sky-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          <div className="absolute -top-10 right-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 opacity-95 shadow-[0_0_60px_rgba(250,250,210,0.8)]" />

          <div className="absolute bottom-0 left-0 right-0 h-44 overflow-hidden">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              <path
                d={`M0 60 Q40 ${60 + Math.sin(time) * 5} 80 60 T160 60 T240 60 T320 60 T400 60 T480 60 T560 60 T640 60 T720 60 V120 H0 Z`}
                fill="url(#waveGradient)"
              />
            </svg>
          </div>

          {krathongs.map((k) => {
            const floatX = k.baseX + Math.sin(time * k.speed + k.phase) * 3;
            const floatY = Math.sin(time * k.speed + k.phase) * 4;
            const color = getKrathongColor(k);

            return (
              <div
                key={k.id}
                className="absolute transition-transform duration-300 ease-in-out"
                style={{
                  left: `${floatX}%`,
                  bottom: `${k.baseBottom}%`,
                  transform: `translateX(-50%) translateY(${floatY}px)`,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-end gap-1 mb-1">
                    <div className="w-0.5 h-5 bg-amber-200 rounded-full shadow-[0_0_8px_rgba(252,211,77,0.9)]" />
                    <div className="w-0.5 h-6 bg-amber-300 rounded-full shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                    <div className="w-0.5 h-5 bg-amber-200 rounded-full shadow-[0_0_8px_rgba(252,211,77,0.9)]" />
                  </div>

                  <div className="relative">
                    <div
                      className="w-32 h-10 rounded-full shadow-lg flex items-center justify-center border border-white/20"
                      style={{ background: color, boxShadow: `0 16px 30px rgba(15,118,110,0.7)` }}
                    >
                      <span className="px-3 py-0.5 rounded-full bg-black/30 text-emerald-50 text-xs font-medium truncate max-w-[8rem]">
                        {k.name}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 bg-slate-900/85 border border-emerald-400/50 rounded-2xl px-3 py-1.5 text-[10px] text-emerald-50 text-center shadow-md max-w-[11rem]">
                    “{k.wish || "ขอให้มีความสุขและปลอดภัย"}”
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute top-6 left-4 right-4 text-xs text-slate-100 text-center">
            <p className="font-medium">คณะสังคมศาสตร์ มหาวิทยาลัยนเรศวร</p>
            <p className="text-slate-200 mt-1 text-[10px]">
              ขอให้ทุกท่านที่มาลอยกระทงออนไลน์ในค่ำคืนนี้ เต็มไปด้วยความสุข ความสบายใจ และแสงสว่างในทุกเส้นทางชีวิต
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
