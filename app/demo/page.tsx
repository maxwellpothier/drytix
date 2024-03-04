"use client";
import Image from "next/image";
import logo from "../../public/img/Dry.png";
import Head from "next/head";
import {BaseSyntheticEvent, useEffect, useState} from "react";
import twilio from "twilio";
import {profileEnd} from "console";
import SignOutForm from "@/components/SignOutForm";
import NumberForm from "@/components/NumberForm";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const DemoPage = () => {
	const [phone, setPhone] = useState("+13855289781");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const sendMessage = async (messageType: string) => {
		// const res = await fetch("/api", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		phone: "+14807085773",
		// 		message: "predefinedMessage",
		// 	}),
		// });

		console.log(messageType);
		setLoading(true);
		setError(false);
		setSuccess(false);
		let predefinedMessage = "";
		// Set predefined messages based on button clicked
		switch (messageType) {
			case "ReadyForPickup":
				predefinedMessage = "Your clothes are ready for pickup!";
				break;
			case "Reminder":
				predefinedMessage =
					"Friendly reminder about your dry cleaning ready for pickup.";
				break;
			case "DiscountOffer":
				predefinedMessage =
					"Special discount offer just for you! 10% off for your next visit.";
				break;
			default:
				break;
		}
		const res = await fetch("/api", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone: "+14807085773",
				message: "predefinedMessage",
			}),
		});
		console.log("api response", res);

		const apiResponse = await res.json();
		console.log(phone, predefinedMessage);
		if (apiResponse.success) {
			setSuccess(true);
		} else {
			setError(true);
		}
		setLoading(false);
	};

	return (
		<div className="w-full flex justify-center">
			<div className="flex flex-col items-center mt-16 w-10/12 max-w-3xl">
				<Image className="w-20 h-20 z-20" src={logo} alt="" />
				<h1 className="text-4xl mb-8">Dry Cleaner&apos;s Interface</h1>
        <SignOutForm />
				<div className="grid grid-cols-3 gap-20 ml-0">
					<button
						className="button"
						disabled={loading}
						onClick={e => {
							e.preventDefault();
							sendMessage("ReadyForPickup");
						}}>
						Ready for Pickup
					</button>
					<button
						className="button"
						disabled={loading}
						onClick={e => {
							e.preventDefault();
							sendMessage("Reminder");
						}}>
						Reminder
					</button>
					<button
						className="button"
						disabled={loading}
						onClick={e => {
							e.preventDefault();
							sendMessage("DiscountOffer");
						}}>
						Discount Offer
					</button>
					{success && <p>Message sent successfully.</p>}
					{error && <p>Something went wrong.</p>}
				</div>
        <NumberForm />
			</div>
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
