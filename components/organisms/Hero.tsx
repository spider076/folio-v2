import DiscoverButton from "@/components/atoms/DiscoverButton";
import HeroImage from "@/components/atoms/HeroImage";
import Socials from "@/components/molecules/Socials";
import ThemeToggle from "../atoms/ThemeToggle";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="wrapper scroll-mt-[20rem] block sm:flex justify-between items-center mb-[2.75rem] md:mb-[5.75rem] mt-[4rem] sm:mt-[5rem] md:mt-[6.5rem] lg:mt-[7rem]"
    >
      <div className="relative w-fit">
        <h1 className='before:content-["///"] before:h-[300px] before:text-[175px] before:font-[700] before:-z-10 before:select-none before:translate-x-[-95%] before:translate-y-0 webkit_text_stroke before:opacity-[0.25] before:tracking-[-.1em] before:absolute text-[65px] md:text-[96px] text-text_primary font-semibold w-fit'>
          Saad
        </h1>
        <ThemeToggle />
        <span className="text-[14px] ml-2 mt-4 md:text-[16px] bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Exploring Learning and Building
        </span>
        <h4 className="mt-4 text-[18px] md:text-[19px] pr-4">
          MERN STACK Dev | Upwork Freelancer | Web3 Dev
          <br className="hidden md:block" />
        </h4>

        <div className="mt-4 mb-[1.7rem]">
          <Socials />
        </div>
        <DiscoverButton />
      </div>
      <HeroImage />
    </section>
  );
};

export default Hero;
