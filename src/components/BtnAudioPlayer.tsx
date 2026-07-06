import { useRef, useState } from "react";
import { Volume1, Volume2, Play } from "react-feather";
import { toast } from "react-toastify";

type PlayerState = "paused" | "low" | "high";

export default function BtnAudioPlayer({ src }: { src: string }) {
  const [mode, setMode] = useState<PlayerState>("paused");
  const [count, setCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cyclePlayback = () => {
    if (count > 0 && count % 6 === 0) {
      toast.info(
        <a
          href="https://suno.com/s/FgY1a14ixD5bInTi"
          target="_blank"
          rel="noreferrer"
        >
          BGM Link (Suno)
        </a>,
      );
    }
    if (!audioRef.current) return;

    const audio = audioRef.current;
    setCount(count + 1);

    if (mode === "paused") {
      audio.muted = false;
      audio.volume = 0.2;
      audio.play().catch((err) => {
        toast.error("Audio playback error.");
        console.log("Playback error:", err);
      });
      setMode("low");
    } else if (mode === "low") {
      audio.volume = 0.4;
      setMode("high");
    } else {
      audio.pause();
      audio.volume = 0.2;
      setMode("paused");
    }
  };

  const renderIcon = () => {
    switch (mode) {
      case "low":
        return <Volume1 size={20} />;
      case "high":
        return <Volume2 size={20} />;
      default:
        return <Play size={20} />;
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      <audio
        ref={audioRef}
        src={src}
        loop
        muted
        preload="auto"
        style={{ display: "none" }}
      />

      <button
        onClick={cyclePlayback}
        className="bg-transparent rounded-full border-none text-text
                cursor-pointer
                p-2"
      >
        {renderIcon()}
      </button>
    </div>
  );
}
