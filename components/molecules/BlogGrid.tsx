import Blogwork from "../atoms/Blogwork";

const BlogGrid = () => {
  return (
    <div className="flex justify-center mb-16">
      <div
        className="grid gap-[0.2rem] md:gap-[0.8rem] flex-col justify-center items-center grid-cols-[1fr_1fr_1fr] md:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-[min(100%,_75rem)] md:w-[min(90%,_72rem)] blog_grid"
        style={{
          gridAutoRows: "230px",
        }}
      >
        <Blogwork
          blog="frost"
          tall
          subtitle="docker networking"
          link="https://blog.Saad.social/docker"
        />
        <Blogwork
          blog="deep"
          subtitle="graphql"
          link="https://blog.Saad.social/graphql"
        />
        <Blogwork
          blog="rain"
          tall
          subtitle="kafka"
          link="https://blog.Saad.social/kafka"
        />
        <Blogwork
          blog="purp"
          subtitle="whisper"
          link="https://blog.Saad.social/whisper"
        />
        <Blogwork
          blog="makima"
          tall
          subtitle="cloudflare"
          link="https://blog.Saad.social/cloudflare"
        />
        <Blogwork
          blog="ghost"
          tall
          subtitle="moving gradients"
          link="https://blog.Saad.social/moving-gradients"
        />
        <Blogwork
          blog="yoru"
          tall
          shrink
          commission
          subtitle="grid"
          link="https://blog.Saad.social/grid"
        />
        <Blogwork
          blog="nisu"
          tall
          subtitle="zustand"
          link="https://blog.Saad.social/zustand"
        />
        <Blogwork
          blog="lost"
          subtitle="dnd"
          link="https://blog.Saad.social/drag-n-drop"
        />
        <Blogwork
          blog="momi"
          subtitle="evolution"
          link="https://blog.Saad.social/evolution-of-frontend-development"
        />
      </div>
    </div>
  );
};

export default BlogGrid;
