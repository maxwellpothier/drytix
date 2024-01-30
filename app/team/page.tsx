import Image from "next/image";
import logo from "../../public/img/Dry.png";
import AboutMe from "@/components/AboutMe";

const TeamPage = () => {
	return (
		<div className="w-full flex justify-center">
			<div className="flex flex-col items-center mt-16 w-10/12 max-w-3xl">
				<Image className="w-20 h-20 z-20" src={logo} alt="" />
				<h1 className="text-4xl mb-8">Meet the Team!</h1>
				<a className="mb-10 text-blue-600 underline" href="/">
					Back Home
				</a>
				<div className="grid grid-cols-3 gap-10 ml-10">
					<AboutMe
						picture={"/img/max.jpg"}
						name={"Tanner Manwaring (CEO)"}
						statement={""}
						hometown={""}
					/>
					<AboutMe
						picture={"/img/isaac.jpg"}
						name={"Isaac Weaver (CTO)"}
						statement={""}
						hometown={"Olney, MD"}
					/>
					<AboutMe
						picture={"/img/max.jpg"}
						name={"Max Pothier (CMO)"}
						statement={""}
						hometown={"Gilbert, AZ"}
					/>
				</div>
			</div>
		</div>
	);
};

export default TeamPage;
