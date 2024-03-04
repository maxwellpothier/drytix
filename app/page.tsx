"use client";
import ContactForm from "../components/ContactForm";
import { useForm } from "react-hook-form";
// import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "../public/img/Dry.png";
// import clothes from "../public/img/dry-clean.jpeg";

type FormValues = {
  name: string;
  email: string;
  phone: string;
};

export default function Home() {
  const { handleSubmit, register } = useForm<FormValues>();

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center mt-16 w-10/12 max-w-3xl">
        <Image className="w-20 h-20 z-20" src={logo} alt="" />
        <h1 className="text-4xl mb-8">DryTix</h1>
        <p className="text-l mb-4">
          Hey Clean Team, meet DryTix - your digital sidekick in the world of
          dry cleaning! We&apos;re not just an upgrade; we&apos;re a
          game-changer for your business.
        </p>
        <p className="text-l mb-6">
          Imagine a world where paper tickets are a thing of the past, and your
          operations run smoother than ever. DryTix is your high-tech toolkit,
          streamlining processes, managing orders, and bringing a touch of
          digital magic to your storefront. With real-time tracking, customer
          satisfaction soars.
        </p>
        <p className="text-l mb-6">
          Join the future of dry cleaning with DryTix - because your success
          deserves an upgrade!
        </p>
        <p className="text-l mb-6">
          Please fill out this{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSczbDFNH5rrcqK0q4cyIQXbuQE8zH0m40EiHkOSzBbgRwH8oA/viewform"
            target="_blank"
            className="text-blue-600 underline"
          >
            form
          </a>{" "}
          to help us understand how to create the most useful product!
        </p>
        <a className="mb-10 text-blue-600 underline" href="/team">
          Meet the team!
        </a>
        <a className="mb-10 text-blue-600 underline" href="/demo">
          MVP Demo
        </a>
        <a className="mb-10 text-blue-600 underline" href="/dashboard">
          Dahsboard
        </a>
        <ContactForm />
        {/* <div className="flex mt-10">
					<Image
						src="/img/dry-clean.jpeg"
						width={500}
						height={100}
						alt="hero"
					/>
				</div> */}
      </div>
      <ToastContainer />
    </div>
  );
}
