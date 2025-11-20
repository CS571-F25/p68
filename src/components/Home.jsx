import { Card, Button } from "react-bootstrap";
import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <h1>CRISPR Demo Website</h1>
      <p className="text-muted">
        Explore how CRISPR-Cas9 identifies genomic targets. Use the Explorer page to enter
        DNA and gRNA and watch a scanning animation that highlights PAM motifs and candidate targets.
      </p>

      <div className="d-flex gap-3 justify-content-center my-4 flex-wrap">
        <Button as={Link} to="/explorer" variant="primary">Open Explorer</Button>
        <Button as={Link} to="/tutorial" variant="outline-secondary">Tutorial</Button>
      </div>

      <Card className="card mt-4">
        <Card.Body>
          <Card.Title>Classroom Demo</Card.Title>
          <Card.Text>
            This tool is designed to help learners visualize CRISPR targeting mechanics: PAM recognition,
            gRNA binding, and how mismatches affect targeting. Use conservative sequences for classroom demos.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
