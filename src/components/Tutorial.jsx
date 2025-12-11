export default function Tutorial() {
  return (
    <div className="page-container">
      <h2>Tutorial: How to use the Explorer</h2>
      <Card className="card mt-3">
        <Card.Body>
          <ol>
            <li>Paste or type a DNA sequence (A, C, G, T) into the DNA field.</li>
            <li>Enter a gRNA sequence (usually 20 bases long) in the gRNA field.</li>
            <li>Choose PAM motif (default NGG). "N" means any base.</li>
            <li>Set maximum allowed mismatches (near matches). Exact matches are typically required for cutting.</li>
            <li>Click <strong>Start Scan</strong> and watch the scanner. Results will show candidate binding sites, match percentage, and whether a cut would occur.</li>
          </ol>
          <p>
            Notes: This is a simplified educational model and does not represent full biological complexities like chromatin accessibility,
            off-target scoring algorithms, or repair outcomes.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}