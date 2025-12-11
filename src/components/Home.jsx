import { Card, Button } from "react-bootstrap";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="page-container">
      <h1>Welcome to CRISPR Navigator</h1>
      <p>
        Explore interactive lessons, gene editing tools, and CRISPR screening 
        method visualizations — all in a friendly and colorful environment!
      </p>

      <div className="crispr-card">
        <h3>🧬 Learn the Basics</h3>
        <p>Understand Cas9, gRNAs, PAM sequences, and editing mechanisms.</p>
      </div>

      <div className="crispr-card">
        <h3>🔬 Try The Tutorials</h3>
        <p>Interactive simulations walk you through CRISPR strategies step-by-step.</p>
      </div>

      <div className="crispr-card">
        <h3>🧪 Validate Your Edits</h3>
        <p>Explore CRISPR screening methods and validation approaches.</p>
      </div>
    </div>
  );
}