import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page not-found">
      <p className="eyebrow">404 / OUTSIDE THE INDEX</p>
      <h1 className="page-title">
        A little off
        <br />
        the beaten path.
      </h1>
      <p className="page-lead">
        This page isn’t here. There’s still plenty to explore.
      </p>
      <Link className="button primary" href="/">
        Back to home
      </Link>
    </div>
  );
}
