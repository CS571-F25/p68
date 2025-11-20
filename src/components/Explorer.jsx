import { useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import SequenceDisplay from "../widgets/SequenceDisplay";
import ResultsCard from "../widgets/ResultsCard";

/**
 * Utility helpers inside the Explorer:
 * - sanitizeSeq: remove non-ACGT and uppercase
 * - reverseComplement: get complement (for matching gRNA to DNA)
 * - pamMatchesAt: checks PAM pattern 'N' wildcard
 * - scoreHamming: simple hamming distance for same-length strings
 */

function sanitizeSeq(s) {
  return (s || "").toUpperCase().replace(/[^ACGT]/g, "");
}

function complementBase(b) {
  if (b === "A") return "T";
  if (b === "T") return "A";
  if (b === "C") return "G";
  if (b === "G") return "C";
  return b;
}
function reverseComplement(s) {
  return s.split("").reverse().map(complementBase).join("");
}

function pamMatchesAt(dna, pos, pamPattern) {
  // pamPattern like 'NGG' where N is wildcard
  for (let i = 0; i < pamPattern.length; i++) {
    const p = pamPattern[i];
    const base = dna[pos + i];
    if (!base) return false;
    if (p === "N") continue;
    if (p !== base) return false;
  }
  return true;
}

function hamming(a, b) {
  if (a.length !== b.length) return Infinity;
  let c = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) c++;
  return c;
}

export default function Explorer() {
  const [dnaInput, setDnaInput] = useState(
    "TTGACATGCGGTTGACTGACCGGATCATGGGCCATGGGCGG" // sample
  );
  const [gRNAInput, setGRNAInput] = useState("GACTGACCGGATCATGGGCC"); // sample 20 nt
  const [pam, setPam] = useState("NGG");
  const [maxMismatches, setMaxMismatches] = useState(0);
  const [results, setResults] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  // animation scanner index
  const [scanIndex, setScanIndex] = useState(0);
  const timerRef = useRef(null);

  // compute results
  const runScan = () => {
    const dna = sanitizeSeq(dnaInput);
    const gRNA = sanitizeSeq(gRNAInput);
    if (!dna || !gRNA) {
      setResults([]);
      return;
    }
    const guide = gRNA.length ? reverseComplement(gRNA) : "";
    const L = guide.length;
    const found = [];

    // scan for PAM positions - we assume PAM is immediately downstream (3') of target on the + strand
    for (let i = 0; i <= dna.length - pam.length; i++) {
      if (!pamMatchesAt(dna, i, pam)) continue;
      // target region we align: assume upstream region of length L ending one base before PAM start (typical SpCas9)
      const targetEnd = i - 1;
      const targetStart = targetEnd - (L - 1);
      if (targetStart < 0) continue;
      const targetSeq = dna.slice(targetStart, targetEnd + 1);
      // compare guide (reverse complement of gRNA) to targetSeq
      const mismatches = hamming(guide, targetSeq);
      const matchPercent = Math.round(((L - mismatches) / L) * 100);
      const cuts = mismatches <= maxMismatches; // simplistic rule: allow cut if mismatches below threshold
      found.push({
        pamPos: i,
        targetStart,
        targetEnd,
        targetSeq,
        mismatches,
        matchPercent,
        cuts,
      });
    }

    setResults(found);
  };

  // scanning animation control
  const startAnimation = () => {
    if (isScanning) return;
    const dna = sanitizeSeq(dnaInput);
    setIsScanning(true);
    setScanIndex(0);
    timerRef.current = setInterval(() => {
      setScanIndex((s) => {
        if (s >= Math.max(0, dna.length - 1)) {
          clearInterval(timerRef.current);
          setIsScanning(false);
          runScan();
          return dna.length - 1;
        }
        return s + 1;
      });
    }, 40); // 40ms per base; adjust speed
  };

  const stopAnimation = () => {
    clearInterval(timerRef.current);
    setIsScanning(false);
    setScanIndex(0);
  };

  // clear results if inputs change
  useEffect(() => {
    setResults([]);
  }, [dnaInput, gRNAInput, pam, maxMismatches]);

  return (
    <div>
      <h2>Explorer</h2>
      <Row className="g-3">
        <Col md={6}>
          <Card className="card">
            <Card.Body>
              <Form.Group className="mb-2">
                <Form.Label>DNA sequence (5' → 3')</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={dnaInput}
                  onChange={(e) => setDnaInput(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Only A, C, G, T will be considered; other characters are removed.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-2 mt-3">
                <Form.Label>gRNA sequence (20nt typical)</Form.Label>
                <Form.Control
                  value={gRNAInput}
                  onChange={(e) => setGRNAInput(e.target.value)}
                  placeholder="Enter gRNA sequence (20 bases)"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>PAM motif</Form.Label>
                <Form.Control value={pam} onChange={(e) => setPam(e.target.value.toUpperCase())} />
                <Form.Text className="text-muted">
                  Use N for wildcard (e.g. NGG).
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-2 mt-2">
                <Form.Label>Allowed mismatches (for near-match demonstration)</Form.Label>
                <Form.Control
                  type="number"
                  value={maxMismatches}
                  min={0}
                  max={20}
                  onChange={(e) => setMaxMismatches(Number(e.target.value))}
                />
              </Form.Group>

              <div className="d-flex gap-2 mt-3">
                <Button variant="primary" onClick={startAnimation} disabled={isScanning}>
                  Start Scan & Animate
                </Button>
                <Button variant="outline-secondary" onClick={() => runScan()}>
                  Run Fast Scan
                </Button>
                <Button variant="outline-danger" onClick={stopAnimation}>
                  Stop
                </Button>
              </div>
            </Card.Body>
          </Card>

          <ResultsCard results={results} />
        </Col>

        <Col md={6}>
          <Card className="card">
            <Card.Body>
              <h5>Live Viewer</h5>
              <p className="text-muted small">Scanner highlights the current base index; PAMs and candidate targets are colored.</p>
              <SequenceDisplay
                dna={sanitizeSeq(dnaInput)}
                results={results}
                scanIndex={scanIndex}
                pam={pam}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
