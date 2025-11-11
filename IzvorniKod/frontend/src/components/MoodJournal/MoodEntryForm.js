import React, { useMemo, useState } from "react";
import "./MoodJournal.css";

const createDefaultEntry = () => ({
  mealName: "",
  moodBefore: 3,
  moodAfter: 3,
  notes: "",
});

const MoodEntryForm = ({ moodScale, onSubmit }) => {
  const [entry, setEntry] = useState(createDefaultEntry);

  const handleBasicChange = (event) => {
    const { name, value } = event.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleMoodSelect = (key, value) => {
    setEntry((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(entry);
    setEntry(createDefaultEntry());
  };

  const beforeMood = useMemo(
    () => moodScale.find(({ value }) => value === entry.moodBefore),
    [entry.moodBefore, moodScale]
  );

  const afterMood = useMemo(
    () => moodScale.find(({ value }) => value === entry.moodAfter),
    [entry.moodAfter, moodScale]
  );

  return (
    <form className="mj-form" onSubmit={handleSubmit}>
      <div className="mj-form-group">
        <label htmlFor="mealName">Naziv obroka (opcionalno)</label>
        <input
          id="mealName"
          name="mealName"
          type="text"
          className="email-input"
          placeholder="npr. Pileća riža"
          value={entry.mealName}
          onChange={handleBasicChange}
        />
      </div>

      <div className="mj-emoji-section">
        <label>Raspoloženje prije obroka</label>
        <div className="mj-emoji-group">
          {moodScale.map(({ value, emoji, label }) => {
            const isActive = entry.moodBefore === value;
            return (
              <button
                type="button"
                key={`before-${value}`}
                className={`button2 mj-emoji-button ${isActive ? "is-active" : ""}`}
                onClick={() => handleMoodSelect("moodBefore", value)}
                aria-pressed={isActive}
                aria-label={`${label} (${value})`}
                title={label}
              >
                <span role="img" aria-hidden="true">
                  {emoji}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mj-emoji-caption">
          Trenutni odabir: {beforeMood?.emoji} {beforeMood?.label}
        </p>
      </div>

      <div className="mj-emoji-section">
        <label>Raspoloženje nakon obroka</label>
        <div className="mj-emoji-group">
          {moodScale.map(({ value, emoji, label }) => {
            const isActive = entry.moodAfter === value;
            return (
              <button
                type="button"
                key={`after-${value}`}
                className={`button2 mj-emoji-button ${isActive ? "is-active" : ""}`}
                onClick={() => handleMoodSelect("moodAfter", value)}
                aria-pressed={isActive}
                aria-label={`${label} (${value})`}
                title={label}
              >
                <span role="img" aria-hidden="true">
                  {emoji}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mj-emoji-caption">
          Trenutni odabir: {afterMood?.emoji} {afterMood?.label}
        </p>
      </div>

      <div className="mj-form-group">
        <label htmlFor="notes">Bilješke</label>
        <textarea
          id="notes"
          name="notes"
          className="email-input mj-notes"
          placeholder="Kako se obrok odrazio na tvoje raspoloženje?"
          value={entry.notes}
          onChange={handleBasicChange}
        />
      </div>

      <button type="submit" className="button2 mj-submit">
        Spremi unos
      </button>
    </form>
  );
};

export default MoodEntryForm;
