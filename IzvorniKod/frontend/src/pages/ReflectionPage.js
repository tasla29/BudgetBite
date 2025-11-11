import React, { useMemo } from "react";
import Navbar from "../components/Navbar";
import MoodEntryList from "../components/MoodJournal/MoodEntryList";
import {
  MOOD_SCALE,
  sampleCostHistory,
  sampleMoodEntries,
  sampleReflectionWeekly,
} from "../components/MoodJournal/samples";
import "../styles/global.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const ReflectionPage = () => {
  const moodSummary = useMemo(() => {
    if (!sampleReflectionWeekly.length) {
      return { before: 0, after: 0, delta: 0 };
    }

    const totals = sampleReflectionWeekly.reduce(
      (acc, entry) => ({
        before: acc.before + entry.averageMoodBefore,
        after: acc.after + entry.averageMoodAfter,
      }),
      { before: 0, after: 0 }
    );

    const before = totals.before / sampleReflectionWeekly.length;
    const after = totals.after / sampleReflectionWeekly.length;

    return { before, after, delta: after - before };
  }, []);

  const costSummary = useMemo(() => {
    if (!sampleCostHistory.length) {
      return { average: 0, max: 0, min: 0 };
    }

    const totals = sampleCostHistory.reduce(
      (acc, entry) => ({
        sum: acc.sum + entry.totalSpent,
        max: Math.max(acc.max, entry.totalSpent),
        min: Math.min(acc.min, entry.totalSpent),
      }),
      { sum: 0, max: Number.NEGATIVE_INFINITY, min: Number.POSITIVE_INFINITY }
    );

    return {
      average: totals.sum / sampleCostHistory.length,
      max: totals.max,
      min: totals.min,
    };
  }, []);

  return (
    <div>
      <Navbar />
      <main className="home-outer-container mj-container">
        <div className="mj-content">
          <section className="mj-card">
            <h1>Tjedna refleksija</h1>
            <p>
              Pregledaj obrasce između raspoloženja i potrošnje kroz tjedne.
              Kombinirani grafovi i bilješke iz dnevnika pomoći će ti pronaći što
              te najviše motivira.
            </p>
          </section>

          <section className="mj-card">
            <h2>Trend raspoloženja</h2>
            <p>
              Prosječne ocjene raspoloženja prije i nakon obroka za svaki tjedan.
            </p>
            <div style={{ width: "100%", height: 340 }} className="reflection-chart">
              <ResponsiveContainer>
                <LineChart data={sampleReflectionWeekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="weekLabel"
                    label={{ value: "Tjedan", position: "insideBottom", offset: -4 }}
                  />
                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    label={{ value: "Raspoloženje", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    formatter={(value, name) => [value.toFixed(1), name === "averageMoodBefore" ? "Prije obroka" : "Nakon obroka"]}
                    labelFormatter={(label) => `Tjedan ${label}`}
                  />
                  <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: 16 }} />
                  <Line
                    type="monotone"
                    dataKey="averageMoodBefore"
                    name="Prije obroka"
                    stroke="#125B47"
                    strokeWidth={2}
                    dot
                  />
                  <Line
                    type="monotone"
                    dataKey="averageMoodAfter"
                    name="Nakon obroka"
                    stroke="#F6A623"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="reflection-summary">
              <div className="reflection-summary-item">
                <span className="reflection-label">Prosjek prije obroka</span>
                <span className="reflection-value">{moodSummary.before.toFixed(1)}</span>
              </div>
              <div className="reflection-summary-item">
                <span className="reflection-label">Prosjek nakon obroka</span>
                <span className="reflection-value">{moodSummary.after.toFixed(1)}</span>
              </div>
              <div className="reflection-summary-item">
                <span className="reflection-label">Prosječna promjena</span>
                <span className="reflection-value">
                  {moodSummary.delta >= 0 ? "+" : ""}
                  {moodSummary.delta.toFixed(1)}
                </span>
              </div>
            </div>
          </section>

          <section className="mj-card">
            <h2>Evolucija troškova</h2>
            <p>Tjedni pregled ukupne potrošnje na hranu.</p>
            <div style={{ width: "100%", height: 320 }} className="reflection-chart">
              <ResponsiveContainer>
                <BarChart data={sampleCostHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="weekLabel" label={{ value: "Tjedan", position: "insideBottom", offset: -4 }} />
                  <YAxis label={{ value: "Troškovi (€)", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    formatter={(value) => [`${Number(value).toFixed(2)} €`, "Ukupni trošak"]}
                    labelFormatter={(label) => `Tjedan ${label}`}
                  />
                  <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: 16 }} />
                  <Bar dataKey="totalSpent" name="Ukupni trošak" fill="#F6A623" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="reflection-summary">
              <div className="reflection-summary-item">
                <span className="reflection-label">Prosječan tjedni trošak</span>
                <span className="reflection-value">{costSummary.average.toFixed(2)} €</span>
              </div>
              <div className="reflection-summary-item">
                <span className="reflection-label">Najveći trošak</span>
                <span className="reflection-value">{costSummary.max.toFixed(2)} €</span>
              </div>
              <div className="reflection-summary-item">
                <span className="reflection-label">Najmanji trošak</span>
                <span className="reflection-value">{costSummary.min.toFixed(2)} €</span>
              </div>
            </div>
          </section>

          <section className="mj-card">
            <h2>Bilješke iz dnevnika raspoloženja</h2>
            <MoodEntryList entries={sampleMoodEntries} moodScale={MOOD_SCALE} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ReflectionPage;
