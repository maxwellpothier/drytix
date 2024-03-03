"use client";
import Image from "next/image";
import logo from "../../public/img/Dry.png";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {messages} from "@/data/messages";

const PHONE_NUMBER_TO_SEND_TO = "+14807085773";

const DemoPage = () => {
	const sendMessage = async (messageType: string) => {
		const predefinedMessage: string =
			messages[messageType as keyof typeof messages];

		console.log(predefinedMessage);
		try {
			const res = await fetch("/api", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					phone: PHONE_NUMBER_TO_SEND_TO,
					message: predefinedMessage,
				}),
			});
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="w-full flex justify-center">
			<div className="flex flex-col items-center mt-16 w-10/12 max-w-3xl">
				<Image className="w-20 h-20 z-20" src={logo} alt="" />
				<h1 className="text-4xl mb-8">Dry Cleaner&apos;s Interface</h1>
				<a className="mb-10 text-blue-600 underline" href="/">
					Back Home
				</a>
				<div className="grid grid-cols-3 gap-20 ml-0">
					<button
						className="button"
						onClick={e => {
							e.preventDefault();
							toast.promise(sendMessage("ReadyForPickup"), {
								pending: "Sending pickup status...",
								success: "Pickup status sent!",
								error: "Error sending pickup",
							});
						}}>
						Ready for Pickup
					</button>
					<button
						className="button"
						onClick={e => {
							e.preventDefault();
							toast.promise(sendMessage("Reminder"), {
								pending: "Sending reminder...",
								success: "Reminder sent!",
								error: "Error sending reminder",
							});
						}}>
						Reminder
					</button>
					<button
						className="button"
						onClick={e => {
							e.preventDefault();
							toast.promise(sendMessage("DiscountOffer"), {
								pending: "Sending offer...",
								success: "Offer sent!",
								error: "Error sending offer",
							});
						}}>
						Discount Offer
					</button>
				</div>
			</div>
			<ToastContainer />
			<style jsx>{`
				.button {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 80px; /* Adjust the height as needed */
					background-color: #ffd699; /* Light orange color */
					color: #333; /* Text color */
					border: none;
					border-radius: 8px;
					cursor: pointer;
				}
			`}</style>
		</div>
	);
};

export default DemoPage;
