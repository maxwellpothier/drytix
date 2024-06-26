import Image from "next/image";
import logo from "../../public/img/Dry.png";
import AboutMe from "../../components/AboutMe";
import Banner from "../../components/Banner";

const TeamPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center mt-16 w-10/12 max-w-3xl">
        <Banner dashboard={false} />
        <Image className="w-20 h-20 z-20" src={logo} alt="" />
        <h1 className="text-4xl mb-8">Meet the Team!</h1>
        <div className="grid grid-cols-3 gap-10 ml-10">
          <AboutMe
            picture={"/img/tanner.JPG"}
            name={"Tanner Manwaring (CEO)"}
            statement={
              "Hey Everyone! I'm an applied physics major at Brigham Young University with minors in computer science and Spanish. I love to play sports and go skiing."
            }
            hometown={"Draper, UT"}
          />
          <AboutMe
            picture={"/img/isaac.jpg"}
            name={"Isaac Weaver (CTO)"}
            statement={
              "I'm a mechanical engineering major at Brigham Young University with a minor in computer science. I love the outdoors, technology, and pickleball"
            }
            hometown={"Olney, MD"}
          />
          <AboutMe
            picture={"/img/max.jpg"}
            name={"Max Pothier (CMO)"}
            statement={
              "I am a Computer Science major at Brigham Young University with a passion for music, sports, and building things!"
            }
            hometown={"Gilbert, AZ"}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
