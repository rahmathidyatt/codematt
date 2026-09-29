import { FoundationPage } from "@/components/foundation-page";
import { site } from "@/config/site";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <FoundationPage
      eyebrow="CONTACT"
      title="Good things start with a conversation."
      description="For a project, a question, or an interesting problem."
    >
      <div className="empty-state">
        {site.email ? (
          <a className="button primary" href={`mailto:${site.email}`}>
            Email Rahmat
          </a>
        ) : (
          <p>A public contact address hasn’t been added yet.</p>
        )}
        {site.github && (
          <p>
            <a className="text-link" href={site.github}>
              GitHub
            </a>
          </p>
        )}
        {site.linkedin && (
          <p>
            <a className="text-link" href={site.linkedin}>
              LinkedIn
            </a>
          </p>
        )}
        {site.resume && (
          <p>
            <a className="text-link" href={site.resume}>
              Resume
            </a>
          </p>
        )}
      </div>
    </FoundationPage>
  );
}
