import Link from "next/link";
import { site } from "@/config/site";
export function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <Link href="/" className="wordmark">
          codematt<span aria-hidden="true">.</span>
        </Link>
        <p>A personal portfolio & digital lab.</p>
      </div>
      <p>
        © {new Date().getFullYear()} {site.owner}
        <br />
        <span className="muted">Made with care. Always evolving.</span>
      </p>
    </footer>
  );
}
