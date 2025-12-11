export default function Tutorial() {
  return (
    <div className="page-container">
      <h1>CRISPR Tutorials</h1>
      <p>Choose a tutorial below to start learning:</p>

      <div className="crispr-card">
        <h3>Cas9 Editing Workflow</h3>
        <p>Walk through the end-to-end editing pipeline with interactive examples.</p>
      </div>

      <div className="crispr-card">
        <h3>PAM Identification</h3>
        <p>Learn where editing can occur and identify PAM sites visually.</p>
      </div>

      <div className="crispr-card">
        <h3>gRNA Design Strategies</h3>
        <p>Compare off-target risk and pick high-efficiency guides.</p>
      </div>
    </div>
  );
}