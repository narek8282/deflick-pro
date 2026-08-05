import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { getProjectVideo } from "@/lib/video";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.poster]
    }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const video = getProjectVideo(project);
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];

  return (
    <>
      <SiteHeader />
      <main className="projectPage">
        <section className="projectIntro sectionShell">
          <div className="projectServices">
            <p className="eyebrow">DeFlick services</p>
            {project.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
          <div className="periodicMark">
            <span>{project.order + 1}</span>
            <strong>{project.symbol}</strong>
            <small>{project.title}</small>
          </div>
          <dl className="projectFacts">
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Audience</dt>
              <dd>{project.audience}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
          </dl>
        </section>

        <section className="filmBlock sectionShell">
          {video.provider === "google drive" ? (
            <div className="videoFrame">
              <iframe
                src={video.src}
                title={`${project.title} video`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
              <div>
                <span>{video.provider}</span>
                <strong>{project.title}</strong>
                <p>00:60 / owner supplied preview source</p>
                {video.externalUrl ? (
                  <Link className="button" href={video.externalUrl} target="_blank" rel="noreferrer">
                    OPEN SOURCE FILE
                  </Link>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="posterFrame projectPlayer">
              <Image src={video.poster} alt="" fill priority sizes="100vw" />
              <button type="button" aria-label={`Play ${project.title}`}>
                Play
              </button>
              <div>
                <span>Main film</span>
                <strong>{project.title}</strong>
                <p>00:60 / poster before final video upload</p>
              </div>
            </div>
          )}
        </section>

        <section className="projectSections sectionShell">
          <article>
            <h2>INFORMATION</h2>
            <p>{project.description}</p>
          </article>
          <article>
            <h2>TECHNICAL SPECIFICATION</h2>
            <ul>
              {project.technical.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h2>BACKSTAGE</h2>
            <p>{project.backstage}</p>
          </article>
          <article className="wide">
            <h2>VFX</h2>
            <p>{project.vfx}</p>
            <BeforeAfterSlider before={project.cover} after={project.teaser} label="VFX" />
          </article>
          <article className="wide">
            <h2>COLOR CORRECTION</h2>
            <p>{project.color}</p>
            <BeforeAfterSlider before={project.teaser} after={project.poster} label="COLOR" />
          </article>
          <article>
            <h2>CREW</h2>
            <ul>
              {project.credits.map((credit) => (
                <li key={credit}>{credit}</li>
              ))}
            </ul>
          </article>
          <article>
            <h2>FESTIVAL SELECTIONS</h2>
            {project.awards?.length ? (
              <ul>
                {project.awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            ) : (
              <p>No verified festival selections added yet.</p>
            )}
          </article>
        </section>

        <section className="gallery sectionShell">
          {[project.cover, project.poster, project.teaser].map((image, index) => (
            <Image src={image} alt="" width={900} height={620} key={`${image}-${index}`} />
          ))}
        </section>

        <section className="nextProject sectionShell">
          <Link href={`/work/${nextProject.slug}`}>
            NEXT PROJECT <strong>{nextProject.title}</strong>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
