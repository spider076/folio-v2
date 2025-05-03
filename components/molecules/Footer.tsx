"use client";


import Socials from "./Socials";

const Footer: React.FC = () => {
  return (
    <footer className="wrapper">
      <hr className="h-[1px] border-none w-full mb-6 md:mb-8 bg-elevation_one" />
      <div className="pb-[2.4rem] flex flex-col justify-between items-center md:flex-row">
        <Socials />
        <h6 className="text-center leading-10 mt-0 font-jetbrains">
          Made with love. &#60;3
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
