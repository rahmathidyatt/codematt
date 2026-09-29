import Link from "next/link";
export function FoundationPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="container page">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-lead">{description}</p>
      {children}
      <div className="page-bottom">
        <Link className="text-link" href="/work">
          Explore the work
        </Link>
      </div>
    </div>
  );
}
