import Link from "next/link";
import { getProjects } from "@/lib/content/repository.server";
import { ProjectCard } from "@/components/project-card";
import { now } from "@/config/now";
export default async function Home() {
  const projects = await getProjects();
  const selected = projects.filter((project) => project.featured).slice(0, 2);
  return (
    <>
      <section className="container hero">
        <div className="hero-top">
          <p className="eyebrow">RAHMAT HIDAYAT / DEVELOPER & BUILDER</p>
          <span className="mono muted">PERSONAL PORTFOLIO — VOL. 01</span>
        </div>
        <div className="hero-grid">
          <div>
            <h1>
              I build useful
              <br />
              things with
              <br />
              <span className="accent">code, data</span>
              <br />& curiosity<span className="accent">.</span>
            </h1>
            <p className="hero-description">
              From everyday problems to working software.
              <br />A collection of projects, experiments, and things learned
              along the way.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/work">
                Explore my work
              </Link>
              <Link className="text-link" href="/about">
                A little about me
              </Link>
            </div>
          </div>
          <aside className="index-panel" aria-label="Areas of interest">
            <div className="panel-top">
              <span className="mono">THE PRACTICE</span>
              <span className="mono muted">01—04</span>
            </div>
            <ol>
              {[
                "Web applications",
                "Data & machine learning",
                "Automation",
                "Experiments",
              ].map((item, i) => (
                <li key={item}>
                  <span className="mono">0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
            <div className="panel-note">
              <span className="mono">A SIMPLE IDEA</span>
              <p>
                Make it useful.
                <br />
                Understand how it works.
                <br />
                Keep making it better.
              </p>
            </div>
          </aside>
        </div>
        <div className="hero-bottom">
          <span>Independent projects. Practical questions.</span>
          <span className="mono">CODE / DATA / EVERYDAY LIFE</span>
        </div>
      </section>
      <section className="container section" aria-labelledby="selected">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / THE WORK</p>
            <h2 id="selected">Ideas, put to work.</h2>
          </div>
          <Link className="text-link" href="/work">
            View work index
          </Link>
        </div>
        <div className="selected-grid">
          {selected.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          <aside className="work-note">
            <span className="mono muted">BEHIND THE BUILD</span>
            <h3>
              Small tools.
              <br />
              Real questions.
            </h3>
            <p>
              I’m interested in the space between a recurring problem and a
              useful piece of software.
            </p>
            <p>
              Each project is a place to explore the decisions, constraints, and
              lessons behind the code.
            </p>
            <Link href="/lab" className="text-link">
              Visit the lab
            </Link>
          </aside>
        </div>
      </section>
      <section className="container now-section">
        <p className="eyebrow">02 / IN THE MAKING</p>
        <div>
          <h2>
            Always a work
            <br />
            in progress.
          </h2>
          <p>{now.building}</p>
          <Link className="text-link" href="/lab">
            Currently building
          </Link>
        </div>
        <p className="mono muted">
          UPDATED
          <br />
          {now.updated}
        </p>
      </section>
    </>
  );
}
