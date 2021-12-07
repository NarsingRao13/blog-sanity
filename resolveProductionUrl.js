const projectUrl = process.env.SANITY_STUDIO_PROJECT_URL;
const previewSecret = process.env.SANITY_STUDIO_SECRET_CODE;

export default function resolveProductionUrl(document) {
  console.log(previewSecret);
  console.log(projectUrl);
  return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document.slug.current}`;
}
