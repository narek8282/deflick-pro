import type { Project } from "./content";

export function getProjectVideo(project: Project) {
  const { video } = project;

  if (video.muxPlaybackId) {
    return {
      provider: "mux",
      src: `https://stream.mux.com/${video.muxPlaybackId}.m3u8`,
      poster: `https://image.mux.com/${video.muxPlaybackId}/thumbnail.webp`
    };
  }

  if (video.vimeoUrl) return { provider: "vimeo", src: video.vimeoUrl, poster: project.poster };
  if (video.youtubeUrl) return { provider: "youtube", src: video.youtubeUrl, poster: project.poster };
  if (video.googleDrivePreviewUrl) {
    return {
      provider: "google drive",
      src: video.googleDrivePreviewUrl,
      poster: project.poster,
      externalUrl: video.externalUrl
    };
  }
  if (video.directMp4 || video.directWebm) {
    return { provider: "direct", src: video.directMp4 ?? video.directWebm, poster: project.poster };
  }

  return { provider: "poster", src: project.poster, poster: project.poster };
}
