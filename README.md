# Ambient Soundscape Mixer

A distraction-free web audio interface for generating custom focus soundscapes. Built to mix multiple ambient tracks smoothly with a built-in Pomodoro focus timer that automatically manages playback state.

Built as **Project #3** of a 90-Day / 30-Project Developer Sprint.

## 🎧 Features

* **Multi-Track Audio Engine:** Seamlessly mix Rain, Campfire, Ocean Waves, and Forest ambience using the HTML5 Audio API, decoupled from React re-renders via `useRef`.
* **Pomodoro Automation:** Built-in memory-safe focus timer that automatically triggers a master mute on the audio engine when a session reaches zero.
* **Persistent Mixes:** Your custom volume levels are silently saved to `localStorage` on every slider adjustment and safely restored on page refresh without violating browser autoplay policies.
* **Dynamic UI States:** Sound cards feature real-time visual feedback, glowing and pulsing gently using Tailwind CSS animations when tracks are active.
* **Batch State Controls:** Master "Stop All" and "Reset Volumes" controls to instantly batch-update the React state and silence all hardware audio nodes.

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **State Management:** React `useState`, `useEffect`, and `useRef`
* **Audio:** HTML5 `<audio>` API

## 💻 Running Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/abikurian/ambient-mixer.git](https://github.com/abikurian/ambient-mixer.git)