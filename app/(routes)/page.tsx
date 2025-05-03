import Footer from "@/components/molecules/Footer";
import About from "@/components/organisms/About";
import GithubCalender from "@/components/organisms/GithubCalender";
import Hero from "@/components/organisms/Hero";
import RecentBlogs from "@/components/organisms/RecentBlogs";
import Repos from "@/components/organisms/Repos";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <RecentBlogs />
      {/* <About /> */}
      <GithubCalender />
      <Repos />
      {/* <Timeline timeline={timelines} /> */}
    </div>
  );
}
