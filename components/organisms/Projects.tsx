import { fetchProjects } from "@/lib/notionClient";
import ProjectCard from "../molecules/ProjectCard";

const Projects: React.FC = async () => {
  const projects = await fetchProjects();

  // console.log(projects[0]?.properties?.Icon?.files[0]?.name);

  if (!projects || projects.length === 0) {
    return (
      <section className="wrapper pb-5 md:pb-0" id="work">
        <div className="title flex justify-start mt-12 md:justify-start">
          <h2 className="inline-block mb-4">
            <span className="text-accent">code</span>:work
          </h2>
        </div>
        <p>No projects found.</p>
      </section>
    );
  }

  return (
    <section className="wrapper pb-5 md:pb-0" id="work">
      <div className="title flex justify-start mt-12 md:justify-start">
        <h2 className="inline-block mb-4">
          <span className="text-accent">code</span>:work
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.length > 0 &&
          projects.map((project: any) => (
            <ProjectCard
              key={project?.id}
              title={project?.properties?.Name.title[0].text.content}
              description={
                project.properties.Description.rich_text[0].text.content
              }
              href={project.properties.DemoURL.url}
              githubUrl={project.properties.GithubURL.url}
              icon={
                project?.properties?.Icon?.files[0]?.name ||
                project?.properties?.Icon?.files[0]?.file?.url ||
                null
              }
              tags={project.properties.Tags.multi_select.map(
                (tag: any) => tag.name
              )}
            />
          ))}
      </div>
    </section>
  );
};

export default Projects;
