import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
        <section className="projectHero">
          <Image src={project.poster} alt="" fill priority sizes="100vw" />
          <div>
            <p className="eyebrow">
              {project.category} / {project.year}
            </p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
        </section>

        <section className="projectMeta sectionShell">
          <dl>
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>DeFlick role</dt>
              <dd>{project.role}</dd>
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
                <strong>Owner-supplied showreel</strong>
                <p>
                  This temporary Drive player requires intentional playback. Replace with Mux,
                  Vimeo or direct MP4/WebM for final adaptive delivery.
                </p>
                {video.externalUrl ? (
                  <Link className="button" href={video.externalUrl} target="_blank" rel="noreferrer">
                    Open source file
                  </Link>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="posterFrame">
              <Image src={video.poster} alt="" fill sizes="100vw" />
              <div>
                <span>{video.provider}</span>
                <strong>Main film field ready</strong>
                <p>Audio requires user action. Mux, Vimeo, YouTube and direct MP4/WebM are supported by schema.</p>
              </div>
            </div>
          )}
        </section>

        <section className="projectBody sectionShell">
          <article>
            <p className="eyebrow">Description</p>
            <p>{project.description}</p>
          </article>
          <article>
            <p className="eyebrow">Services</p>
            <ul>
              {project.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </article>
          <article>
            <p className="eyebrow">Credits</p>
            <ul>
              {project.credits.map((credit) => (
                <li key={credit}>{credit}</li>
              ))}
            </ul>
          </article>
          {project.awards?.length ? (
            <article>
              <p className="eyebrow">Awards</p>
              <ul>
                {project.awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </section>

        <section className="gallery sectionShell">
          {[project.cover, project.poster, project.teaser].map((image, index) => (
            <Image src={image} alt="" width={900} height={620} key={`${image}-${index}`} />
          ))}
        </section>

        <section className="nextProject sectionShell">
          <Link href={`/work/${nextProject.slug}`}>
            Next project <strong>{nextProject.title}</strong>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
