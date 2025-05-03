import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Nav from "../atoms/Nav";

const NavHost: React.FC = () => {
  // getting the scroll position
  const [y, setY] = useState(0);

  const handleNavigation = () => {
    const windowScroll = window.scrollY;
    setY(windowScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);
    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, []);

  return (
    <nav className="bottom-auto top-0 flex fixed items-center z-[15] w-full  justify-center ">
      <div
        className={cn(
          " p-0 !px-40 w-[60rem] md:w-[50rem] rounded-[12px] text-center items-center md:top-0 md:bottom-auto md:px-20 md:py-5  md:bg-bg_color",
          {
            "md:border-none md:border-b-accent_opacity ": y < 20,
            "md:border-b-[1.5px] md:border-b-accent_opacity md:py-2 md:mt-2 md:w-[34rem] md:bg-elevation_five md:backdrop-blur-[15px] webkit_backdrop_filter_15px":
              y > 20,
          }
        )}
        style={{
          transition: "all 0.5s ease",
        }}
      >
        <div className="flex !px-20 gap-[2vw] md:gap-16 justify-evenly md:justify-center">
          <Nav href="/#home" section="/" isSelected={y < 300} />
          <Nav href="/#about" section="about" isSelected={y > 300 && y < 550} />
          <Nav href="/#work" section="work" isSelected={y > 550} />
          <Nav href="/blogs" section="blogs" isSelected={y > 550} />
        </div>
      </div>
    </nav>
  );
};

export default NavHost;
