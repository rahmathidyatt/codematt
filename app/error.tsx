"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1 className="page-title">Let’s try that again.</h1>
      <p className="page-lead">This page couldn’t load. Please try again.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
