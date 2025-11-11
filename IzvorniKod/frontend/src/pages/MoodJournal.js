import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MoodEntryForm from "../components/MoodJournal/MoodEntryForm";
import MoodEntryList from "../components/MoodJournal/MoodEntryList";
import { MOOD_SCALE, sampleMoodEntries } from "../components/MoodJournal/samples";
import "../styles/global.css";
import "../components/MoodJournal/MoodJournal.css";

const MoodJournal = () => {
  const [entries, setEntries] = useState(sampleMoodEntries);

  const handleSubmit = (entry) => {
    const newEntry = {
      id: Date.now(),
      ...entry,
      consumedAt: new Date(),
    };

    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <div>
      <Navbar />
      <main className="home-outer-container mj-container">
        <div className="mj-content">
          <section className="mj-card">
            <h1>Dnevnik raspoloženja</h1>
            <p>
              Ocijeni kako se osjećaš prije i nakon obroka pomoću brzih emoji
              oznaka i zapiši kratke dojmove. Uz bilješke lakše ćeš otkriti
              koji obroci ti daju najviše energije.
            </p>
          </section>

          <section className="mj-card">
            <h2>Novi unos</h2>
            <MoodEntryForm moodScale={MOOD_SCALE} onSubmit={handleSubmit} />
          </section>

          <section className="mj-card">
            <h2>Moji unosi</h2>
            <MoodEntryList entries={entries} moodScale={MOOD_SCALE} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default MoodJournal;
