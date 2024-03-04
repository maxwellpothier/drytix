"use client";
import Image from "next/image";
import logo from "../../public/img/Dry.png";
import SignOutForm from "../../components/SignOutForm";
import NumberForm from "../../components/NumberForm";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ChangeEvent, useState} from "react";
import {sendMessage} from "../../utils/sendMessage";

const dummyCustomers: {[key: string]: string} = {
	Max: "+14807085773",
	Tanner: "+13855289781",
	Isaac: "+18586884626",
};

const DemoPage = () => {
	const [selectedPhone, setSelectedPhone] = useState("14807085773");

	const changeCustomer = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const customer = e.target.value;
		setSelectedPhone(dummyCustomers[customer]);
	};

	return (
		<div className="w-full flex justify-center">
			<div className="flex flex-col items-center mt-16 w-10/12 max-w-3xl">
				<Image className="w-20 h-20 z-20" src={logo} alt="" />
				<h1 className="text-4xl mb-8">Dry Cleaner&apos;s Interface</h1>
				<SignOutForm />
				<a className="mb-10 text-blue-600 underline" href="/">
					Back Home
				</a>
				<span className="mb-2">Customer to text:</span>
				<select
					className="mb-10 border"
					onChange={e => changeCustomer(e)}>
					{Object.keys(dummyCustomers).map((customer, index) => {
						return (
							<option key={index} value={customer}>
								{customer}
							</option>
						);
					})}
				</select>
				<div className="grid grid-cols-3 gap-20 ml-0">
					<button
						className="button"
						onClick={e => {
							e.preventDefault();
							toast.promise(
								sendMessage(selectedPhone, "ReadyForPickup"),
								{
									pending: "Sending pickup status...",
									success: "Pickup status sent!",
									error: "Error sending pickup",
								}
							);
						}}>
						Ready for Pickup
					</button>
					<button
						className="button"
						onClick={e => {
							e.preventDefault();
							toast.promise(
								sendMessage(selectedPhone, "Reminder"),
								{
									pending: "Sending reminder...",
									success: "Reminder sent!",
									error: "Error sending reminder",
								}
							);
						}}>
						Reminder
					</button>
					<button
						className="button"
						onClick={e => {
							e.preventDefault();
							toast.promise(
								sendMessage(selectedPhone, "DiscountOffer"),
								{
									pending: "Sending offer...",
									success: "Offer sent!",
									error: "Error sending offer",
								}
							);
						}}>
						Discount Offer
					</button>
				</div>
				<div style={{height: "50px"}} />
				<NumberForm />
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
