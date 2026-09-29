import { FoundationPage } from "@/components/foundation-page";
export const metadata = { title: "About" };
export default function About() {
  return (
    <FoundationPage
      eyebrow="A LITTLE ABOUT ME"
      title="Curiosity, with a practical side."
      description="I’m Rahmat Hidayat. codematt is where I bring together the things I make with code and data."
    >
      <div className="prose">
        <h2>From a question to a working tool</h2>
        <p>
          I enjoy building web applications, exploring data, and finding ways to
          make everyday work simpler.
        </p>
        <h2>How I want to work</h2>
        <p>
          Start with the problem. Keep the structure understandable. Test the
          important paths. Document what the next person needs to know.
        </p>
      </div>
    </FoundationPage>
  );
}
