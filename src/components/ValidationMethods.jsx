import { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";

const sections = [
  {
    title: "1. Sanger Sequencing Validation",
    desc: `A simple and widely used method for verifying CRISPR edits.
           DNA around the targeted locus is PCR-amplified and sequenced.
           Mixed peaks in chromatograms indicate heterogenous editing.`,
    details: `Pros:
- Fast (1–2 days)
- Inexpensive
- Easy to interpret for clean edits

Limitations:
- Difficult to quantify complex mixtures of indels
- Low sensitivity for low-frequency edits`
  },
  {
    title: "2. T7E1 / Surveyor Mismatch Assay",
    desc: `An enzymatic cleavage assay that detects mismatches caused by indels.
           PCR products are denatured and re-annealed to form heteroduplexes, 
           which are then cleaved by mismatch-sensitive endonucleases.`,
    details: `Pros:
- Quick screen for editing efficiency
- Works without sequencing

Limitations:
- Not precise (cannot identify exact indels)
- Requires gel electrophoresis
`
  },
  {
    title: "3. Next-Generation Sequencing (Deep Amplicon Sequencing)",
    desc: `Deep sequencing of PCR-amplified target regions.
           Provides high-resolution quantification of all editing outcomes.`,
    details: `Pros:
- Most accurate method
- Can detect very low-frequency edits
- Reveals full indel spectrum

Limitations:
- More expensive
- Requires bioinformatics analysis
`
  },
  {
    title: "4. qPCR / Droplet Digital PCR (ddPCR)",
    desc: `Sensitive quantitative assays for measuring allele frequency changes,
           knockdown efficiency, or HDR versus NHEJ ratios.`,
    details: `Pros:
- Very sensitive
- Excellent for quantifying HDR
- ddPCR eliminates dependency on standard curves

Limitations:
- Requires specialized equipment
- Cannot provide sequence-level detail
`
  },
  {
    title: "5. Functional Screening / Phenotypic Assays",
    desc: `Used when the goal is to confirm that an edit produces the expected 
           biological or cellular phenotype.`,
    details: `Examples:
- Fluorescence reporters
- Drug resistance assays
- Cell viability screens

Limitations:
- Requires well-designed biological readouts
- Results may be influenced by off-target effects`
  },
  {
    title: "6. Genome-Wide CRISPR Screens (Knockout, Activation, Interference)",
    desc: `Massively parallel screens using sgRNA libraries to discover essential genes,
           drug targets, or regulatory pathways.`,
    details: `Types:
- CRISPR KO (gene disruption)
- CRISPRa (transcriptional activation)
- CRISPRi (transcriptional repression)

Pros:
- Very powerful discovery tool

Limitations:
- Requires next-generation sequencing and complex analysis`
  }
];

export default function ValidationMethods() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div>
      <h2>CRISPR Validation & Screening Methods</h2>

      <p className="text-muted">
        Explore how scientists confirm CRISPR edits and perform large-scale genetic screens.
        Click any method below to learn more.
      </p>

      {sections.map((sec, idx) => (
        <Card className="card mt-3" key={idx}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <h5 style={{ margin: 0 }}>{sec.title}</h5>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => toggle(idx)}
              >
                {openIndex === idx ? "Hide" : "Learn More"}
              </Button>
            </div>

            <p className="mt-2 text-muted">{sec.desc}</p>

            <Collapse in={openIndex === idx}>
              <div className="mt-2">
                <Card className="p-3 bg-light">
                  <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                    {sec.details}
                  </pre>
                </Card>
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

