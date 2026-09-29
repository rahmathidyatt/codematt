import { FoundationPage } from "@/components/foundation-page";
import { now } from "@/config/now";
export const metadata = { title: "Lab" };
export default function Lab() {
  return (
    <FoundationPage
      eyebrow="CODEMATT LAB / IN PROGRESS"
      title="Room to figure things out."
      description="A space for prototypes, practical questions, and work that is still taking shape."
    >
      <div className="lab-grid">
        <section>
          <span className="mono">01 / CURRENTLY BUILDING</span>
          <h2>The portfolio itself.</h2>
          <p>{now.building}</p>
        </section>
        <section>
          <span className="mono">02 / CURRENTLY LEARNING</span>
          <h2>A better publishing workflow.</h2>
          <p>{now.learning}</p>
        </section>
      </div>
    </FoundationPage>
  );
}
