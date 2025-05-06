import Footer from "@/components/molecules/Footer";
import About from "@/components/organisms/About";
import GithubCalender from "@/components/organisms/GithubCalender";
import Hero from "@/components/organisms/Hero";
import RecentBlogs from "@/components/organisms/RecentBlogs";
import Repos from "@/components/organisms/Projects";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Suspense fallback={<div>Loading blogs...</div>}>
        <RecentBlogs />
      </Suspense>
      {/* <About /> */}
      <GithubCalender />
      <Repos />
      {/* <Timeline timeline={timelines} /> */}
    </div>
  );
}
