"use client";

import { CloudRain, Flame, Waves, Trees, Play } from "lucide-react";

const TRACKS = [
  { id: "rain", name: "Rain Storm", icon: CloudRain },
  { id: "fire", name: "Campfire", icon: Flame },
  { id: "waves", name: "Ocean Waves", icon: Waves },
  { id: "forest", name: "Deep Forest", icon: Trees },
];

export default function Home() {
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
          {TRACKS.map((track) => (
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
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors text-zinc-300 hover:text-white">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-600 font-medium w-6">0</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-zinc-600 font-medium w-6 text-right">100</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}