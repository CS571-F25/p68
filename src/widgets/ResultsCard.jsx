import { Card } from "react-bootstrap";

export default function ResultsCard({ results = [] }) {
  return (
    <Card className="card mt-3">
      <Card.Body>
        <h5>Results</h5>
        {results.length === 0 ? (
          <div className="text-muted">No matches found yet. Run a scan to see candidate sites.</div>
        ) : (
          results.map((r, idx) => (
            <div className="result-item" key={`${r.pamPos}-${idx}`}>
              <div className="d-flex justify-content-between">
                <div><strong>Target</strong> pos {r.targetStart}–{r.targetEnd}</div>
                <div><strong>{r.matchPercent}%</strong></div>
              </div>
              <div className="small text-muted">PAM at {r.pamPos} — mismatches: {r.mismatches}</div>
              <div style={{ marginTop: 8 }}>
                <span className={r.cuts ? "badge bg-success" : "badge bg-secondary"}>
                  {r.cuts ? "Cut — Likely" : "No cut (mismatch) "}
                </span>
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
}
