"use client";

import { useState, useRef, useEffect } from "react";
import { CloudRain, Flame, Waves, Trees, Play, Pause, Square, RotateCcw } from "lucide-react";

const TRACKS = [
  { id: "rain", name: "Rain Storm", icon: CloudRain },
  { id: "fire", name: "Campfire", icon: Flame },
  { id: "waves", name: "Ocean Waves", icon: Waves },
  { id: "forest", name: "Deep Forest", icon: Trees },
];

export default function Home() {
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const [trackState, setTrackState] = useState<
    Record<string, { playing: boolean; volume: number }>
  >({
    rain: { playing: false, volume: 50 },
    fire: { playing: false, volume: 50 },
    waves: { playing: false, volume: 50 },
    forest: { playing: false, volume: 50 },
  });

  useEffect(() => {
    TRACKS.forEach((track) => {
      const audio = new Audio(`/audio/${track.id}.mp3`);
      audio.loop = true;
      audioRefs.current[track.id] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
        }
      });
    };
  }, []);

  useEffect(() => {
    TRACKS.forEach((track) => {
      const audio = audioRefs.current[track.id];
      const state = trackState[track.id];
      if (!audio || !state) return;

      if (state.playing) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }

      audio.volume = state.volume / 100;
    });
  }, [trackState]);

  const togglePlay = (id: string) => {
    setTrackState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        playing: !prev[id]?.playing,
      },
    }));
  };

  const handleVolumeChange = (id: string, value: number) => {
    setTrackState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        volume: value,
      },
    }));
  };

  const stopAll = () => {
    setTrackState((prev) => {
      const updated: Record<string, { playing: boolean; volume: number }> = {};
      for (const [id, state] of Object.entries(prev)) {
        updated[id] = { ...state, playing: false };
      }
      return updated;
    });
  };

  const resetVolumes = () => {
    setTrackState((prev) => {
      const updated: Record<string, { playing: boolean; volume: number }> = {};
      for (const [id, state] of Object.entries(prev)) {
        updated[id] = { ...state, volume: 50 };
      }
      return updated;
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-12">

        <header className="text-center space-y-3 pt-8 md:pt-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Ambient<span className="text-zinc-600">Mixer</span>
          </h1>
          <p className="text-zinc-400 font-medium">Craft your perfect focus soundscape.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRACKS.map((track) => {
            const isPlaying = trackState[track.id]?.playing ?? false;
            const volume = trackState[track.id]?.volume ?? 50;

            return (
              <div
                key={track.id}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 flex flex-col gap-6 backdrop-blur-sm transition-colors hover:bg-zinc-900"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-800/50 rounded-xl text-indigo-400">
                      <track.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold text-zinc-200">{track.name}</h2>
                  </div>
                  <button
                    onClick={() => togglePlay(track.id)}
                    className={`p-3 rounded-full transition-colors ${
                      isPlaying
                        ? "bg-indigo-600 text-white hover:bg-indigo-500"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                    }`}
                    aria-label={isPlaying ? `Pause ${track.name}` : `Play ${track.name}`}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-600 font-medium w-6">0</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) =>
                      handleVolumeChange(track.id, Number(e.target.value))
                    }
                    className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-zinc-600 font-medium w-6 text-right">
                    100
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 pt-8 border-t border-zinc-800/50">
          <button
            onClick={stopAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-300 font-medium text-sm transition-all cursor-pointer"
          >
            <Square className="w-4 h-4" />
            Stop All
          </button>
          <button
            onClick={resetVolumes}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-300 font-medium text-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Volumes
          </button>
        </div>

      </div>
    </main>
  );
}