import { Card } from "react-bootstrap";

export default function About() {
  return (
    <div>
      <h2>About this demo</h2>
      <Card className="card mt-3">
        <Card.Body>
          <p>
            CRISPR Explorer is an educational simulation to visualize how Cas9 locates PAMs and how gRNA:DNA complementarity determines binding/cutting.
            Built for classroom demonstration.
          </p>
          <p className="text-muted small">
            This site is for educational use only and does not perform any real genetic manipulations.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
