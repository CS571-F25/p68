/**
 * Props:
 *  - dna: string of A/C/G/T
 *  - results: array of match objects { targetStart, targetEnd, pamPos, cuts, matchPercent }
 *  - scanIndex: integer (scanner position)
 *  - pam: string
 */

function rangesFromResults(results) {
  const pamRanges = results.map((r) => ({ start: r.pamPos, end: r.pamPos + (r.pamLen || 3) - 1 }));
  const targetRanges = results.map((r) => ({ start: r.targetStart, end: r.targetEnd }));
  return { pamRanges, targetRanges };
}

export default function SequenceDisplay({ dna = "", results = [], scanIndex = 0, pam = "NGG" }) {
  const L = dna.length;
  const pamLen = pam.length;

  // build quick lookup arrays
  const pamMap = new Array(L).fill(false);
  const targetMap = new Array(L).fill(false);
  const cutsMap = new Array(L).fill(false);

  results.forEach((r) => {
    for (let i = r.pamPos; i < r.pamPos + pamLen; i++) if (i >= 0 && i < L) pamMap[i] = true;
    for (let i = r.targetStart; i <= r.targetEnd; i++) if (i >= 0 && i < L) {
      targetMap[i] = true;
      if (r.cuts) cutsMap[i] = true;
    }
  });

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "inline-block", verticalAlign: "middle", marginRight: 8 }}>
          <div className="scanner" style={{ visibility: dna ? "visible" : "hidden", transform: `translateX(${0}px)` }} />
        </div>
        <small className="text-muted">Index: {scanIndex}</small>
      </div>

      <div className="sequence" aria-live="polite">
        {dna.split("").map((b, i) => {
          const classes = ["base"];
          if (pamMap[i]) classes.push("pam");
          if (targetMap[i]) classes.push("target");
          // emphasize where scanner is
          const style = {};
          if (i === scanIndex) style.boxShadow = "0 0 8px rgba(111,66,193,0.6)";

          return (
            <span key={i} className={classes.join(" ")} style={style} title={`pos ${i}`}>
              {b}
            </span>
          );
        })}
      </div>

      <div className="mt-2 small text-muted">
        <span style={{ background: "#ffe8a8", padding: "2px 6px", borderRadius: 4 }}>PAM</span>{" "}
        <span style={{ background: "#d1f7d1", padding: "2px 6px", borderRadius: 4, marginLeft: 8 }}>Candidate target</span>
      </div>
    </div>
  );
}
