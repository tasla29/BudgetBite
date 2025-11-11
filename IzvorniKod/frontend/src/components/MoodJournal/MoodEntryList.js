import React, { useMemo } from "react";
import "./MoodJournal.css";

const MoodEntryList = ({ entries, moodScale }) => {
  const moodLookup = useMemo(() => {
    const map = new Map();
    moodScale.forEach((item) => map.set(item.value, item));
    return map;
  }, [moodScale]);

  if (!entries.length) {
    return (
      <div className="mj-empty">
        Još nema unosa. Dodaj prvi zapis nakon obroka.
      </div>
    );
  }

  return (
    <div className="mj-entry-list">
      {entries.map((entry) => (
        <article className="mj-entry-card" key={entry.id}>
          <header className="mj-entry-header">
            <div>
              <h3>{entry.mealName || "Zabilježen obrok"}</h3>
              <p className="mj-entry-date">
                {entry.consumedAt instanceof Date && !Number.isNaN(entry.consumedAt.valueOf())
                  ? entry.consumedAt.toLocaleString("hr-HR")
                  : entry.consumedAt}
              </p>
            </div>
            <div className="mj-entry-ratings">
              <div className="mj-entry-rating">
                <span className="mj-entry-label">Prije</span>
                <span className="mj-entry-emoji">
                  {moodLookup.get(entry.moodBefore)?.emoji ?? "–"}
                </span>
                <span className="mj-entry-value">
                  {moodLookup.get(entry.moodBefore)?.label ?? entry.moodBefore}
                </span>
              </div>
              <div className="mj-entry-rating">
                <span className="mj-entry-label">Poslije</span>
                <span className="mj-entry-emoji">
                  {moodLookup.get(entry.moodAfter)?.emoji ?? "–"}
                </span>
                <span className="mj-entry-value">
                  {moodLookup.get(entry.moodAfter)?.label ?? entry.moodAfter}
                </span>
              </div>
            </div>
          </header>
          <p className="mj-entry-notes">{entry.notes || "Nema bilješki."}</p>
        </article>
      ))}
    </div>
  );
};

export default MoodEntryList;
