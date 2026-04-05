import { notFound } from "next/navigation"
import { ProjectDetailView } from "@/components/project-detail-view"
import { getProjectBySlug } from "@/lib/projects"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()
  return <ProjectDetailView project={project} />
}
