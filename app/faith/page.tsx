'use client';

import { Sparkles } from 'lucide-react';

export default function Faith() {
  return (
    <main className="faith-page">
      <div className="faith-container">
        <div className="faith-header">
          <Sparkles className="faith-icon" />
          <h1 className="title">My Testimony</h1>
        </div>

        <p className="faith-paragraph">
          On <strong>February 12, 2025</strong>, everything changed. After years of battling depression and feeling spiritually distant, I cried out to God with an honest question — should I move on or keep hoping?
          On that very drive to LOFT, I felt something I hadn’t in years: <strong>peace, freedom, and the absolute presence of God.</strong>
        </p>

        <p className="faith-paragraph">
          It was the first time I had <em>zero doubt</em> that God is real. My depression lifted. My anger and hopelessness vanished. And I knew — not just in my head, but in my heart — that God had heard me.
        </p>

        <div className="faith-quote">
        1 I waited patiently for the Lord; and he inclined unto me, and heard my cry.

2 He brought me up also out of an horrible pit, out of the miry clay, and set my feet upon a rock, and established my goings.

3 And he hath put a new song in my mouth, even praise unto our God: many shall see it, and fear, and shall trust in the Lord.<br />
          <span className="faith-quote-author">— Psalm 40:1-3 KJV</span>
        </div>

        <p className="faith-paragraph">
          That verse now lives in me. It's a daily reminder of how deeply God loves, and how faithfully He shows up when we surrender. This is my testimony: <strong>God is real, God is good, and God changed my life.</strong>
        </p>
      </div>
    </main>
  );
}