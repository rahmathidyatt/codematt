import { FoundationPage } from "@/components/foundation-page";
export const metadata = { title: "Notes" };
export default function Notes() {
  return (
    <FoundationPage
      eyebrow="FIELD NOTES"
      title="Write it down. Work it out."
      description="Technical notes, project retrospectives, and things worth remembering."
    >
      <div className="empty-state">
        <h2>The first note is still taking shape.</h2>
        <p>No notes have been published here yet.</p>
      </div>
    </FoundationPage>
  );
}
