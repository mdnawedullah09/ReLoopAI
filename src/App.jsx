import { useState } from "react";
import "./App.css";

function App() {
  const [wasteType, setWasteType] = useState("Plastic");
  const [wasteDetails, setWasteDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const wasteOptions = [
    { emoji: "🧴", name: "Plastic" },
    { emoji: "📦", name: "Cardboard" },
    { emoji: "👕", name: "Old Clothes" },
    { emoji: "🍂", name: "Food & Garden Waste" },
    { emoji: "🔧", name: "Other Materials" },
  ];

  
async function handleAnalyze() {
  if (!wasteDetails.trim()) {
    alert("Please describe the waste you want to reuse.");
    return;
  }

  const amount = Number(quantity);

  if (!Number.isFinite(amount) || amount <= 0) {
    setError("Please enter a quantity greater than zero.");
    return;
  }

  const materialMap = {
    Plastic: "plastic",
    Cardboard: "paper",
    "Old Clothes": "textiles",
    "Food & Garden Waste": "food",
    "Other Materials": "other",
  };

  setLoading(true);
  setError("");
  setResults([]);

  try {
    const response = await fetch(
      "https://reloopai.onrender.com/api/analyze-waste",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waste_type: materialMap[wasteType],
          quantity: amount,
          unit: "kg",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    const data = await response.json();
    setResults(data.business_opportunities || []);
  } catch (err) {
    setError(
      "Could not connect to the backend. Please check that your API server is running."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="app">
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">↻</span>
          <span>ReLoop<span className="brand-highlight">AI</span></span>
        </a>

        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#analyzer">Waste Analyzer</a>
          <a href="#impact">Our Impact</a>
        </div>

        <a href="#analyzer" className="nav-button">
          Start exploring <span>↗</span>
        </a>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot"></span>
              AI FOR A MORE CIRCULAR WORLD
            </div>

            <h1>
              Your waste.
              <br />
              Someone's <span>next big idea.</span>
            </h1>

            <p className="hero-description">
              Turn everyday waste into practical business opportunities.
              Discover what you can reuse, what you can create, and how to
              start earning while helping the planet.
            </p>

            <div className="hero-actions">
              <a href="#analyzer" className="primary-button">
                Discover your opportunity <span>↗</span>
              </a>
              <a href="#how-it-works" className="secondary-button">
                See how it works ↓
              </a>
            </div>

            <div className="hero-note">
              <span>🌱</span>
              Better for the planet. Built for real-world action.
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="floating-tag tag-top">
              <span>♻️</span>
              <div>
                <strong>Waste less</strong>
                <small>Reuse more</small>
              </div>
            </div>

            <div className="plant-card">
              <div className="plant-orbit orbit-one"></div>
              <div className="plant-orbit orbit-two"></div>

              <div className="plant-illustration">🌿</div>

              <div className="plant-caption">
                <span className="caption-label">THE RELOOP IDEA</span>
                <h3>Give materials<br />a second life.</h3>
                <p>Small ideas. Meaningful impact.</p>
              </div>

              <div className="plant-badge">↗ Circular thinking</div>
            </div>

            <div className="floating-tag tag-bottom">
              <span>💡</span>
              <div>
                <strong>Find your next idea</strong>
                <small>Start with what you have</small>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-strip" id="impact">
          <div>
            <span className="stat-icon">♻</span>
            <div>
              <strong>Reuse first</strong>
              <p>Explore a material's potential</p>
            </div>
          </div>
          <div>
            <span className="stat-icon">💡</span>
            <div>
              <strong>Ideas with purpose</strong>
              <p>Discover practical opportunities</p>
            </div>
          </div>
          <div>
            <span className="stat-icon">🌍</span>
            <div>
              <strong>Impact that matters</strong>
              <p>Make better use of resources</p>
            </div>
          </div>
        </section>

        <section className="analyzer-section" id="analyzer">
          <div className="section-heading">
            <span className="section-label">YOUR FIRST STEP</span>
            <h2>Every material has <span>potential.</span></h2>
            <p>
              Tell us what you have. Let's explore what it could become.
            </p>
          </div>

          <div className="analyzer-card">
            <div className="analyzer-intro">
              <div className="analyzer-icon">✳</div>
              <div>
                <h3>Waste opportunity finder</h3>
                <p>Start with a material you want to reuse or repurpose.</p>
              </div>
            </div>

            <label className="field-label">1. Choose your material</label>

            <div className="waste-options">
              {wasteOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className={`waste-option ${
                    wasteType === option.name ? "selected" : ""
                  }`}
                  onClick={() => setWasteType(option.name)}
                >
                  <span>{option.emoji}</span>
                  <small>{option.name}</small>
                </button>
              ))}
            </div>

            <label className="field-label" htmlFor="waste-quantity">
             Quantity (kg)
            </label>

            <input
              id="waste-quantity"
              type="number"
              min="0.1"
              step="0.1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="Enter quantity in kg"
            />

            <label className="field-label" htmlFor="waste-details">
              2. Describe what you have
            </label>

            <textarea
              id="waste-details"
              value={wasteDetails}
              onChange={(event) => setWasteDetails(event.target.value)}
              placeholder="Example: I have 20 old cotton shirts and a basic sewing machine..."
              rows="4"
            />

            <div className="form-footer">
              <p>✦ The more details you share, the more useful the suggestions.</p>
              <button
                type="button"
                className="primary-button analyze-button"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? "Preparing..." : "Find opportunities ↗"}
              </button>
            </div>

          </div>
                  {error && (
          <p role="alert" className="analyzer-error">
            {error}
          </p>
        )}


        {results.length > 0 && (
          <div className="results-card" aria-live="polite">
            <h3>Your Waste Opportunities 🌱</h3>

            <div className="opportunities-grid">
              {results.map((idea, index) => (
                <article className="opportunity-card" key={index}>
                  <span className="opportunity-number">
                    Opportunity 0{index + 1}
                  </span>

                  <h4>{idea.business_idea}</h4>

                  <div className="opportunity-detail">
                    <span>💰 Startup cost</span>
                    <strong>{idea.startup_cost_inr}</strong>
                  </div>

                  <div className="opportunity-detail">
                    <span>🏷️ Selling price</span>
                    <strong>{idea.selling_price}</strong>
                  </div>

                  <div className="opportunity-detail">
                    <span>📈 Expected profit</span>
                    <strong>{idea.expected_profit}</strong>
                  </div>

                  <p className="opportunity-explanation">
                    {idea.explanation}
                  </p>
                </article>
              ))}
            </div>

            <p className="estimate-note">
              Note: These are AI-generated estimates, not guaranteed costs or
              profits. Actual results depend on material quality, processing,
              and local market prices.
            </p>
          </div>
        )}

       
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-heading">
            <span className="section-label">SIMPLE BY DESIGN</span>
            <h2>From leftover to <span>opportunity.</span></h2>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">01</span>
              <div className="step-emoji">🔎</div>
              <h3>Explore your waste</h3>
              <p>Describe the materials you have and how much is available.</p>
            </article>

            <article className="step-card">
              <span className="step-number">02</span>
              <div className="step-emoji">💡</div>
              <h3>Discover possibilities</h3>
              <p>Explore reuse ideas and small-business opportunities.</p>
            </article>

            <article className="step-card">
              <span className="step-number">03</span>
              <div className="step-emoji">🚀</div>
              <h3>Plan your first move</h3>
              <p>Turn a promising idea into practical next steps.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">↻</span>
          <span>ReLoop<span className="brand-highlight">AI</span></span>
        </a>
        <p>Waste is a resource waiting for a new purpose.</p>
        <span className="footer-note">Built for a more circular future 🌱</span>
      </footer>
    </div>
  );
}

export default App;