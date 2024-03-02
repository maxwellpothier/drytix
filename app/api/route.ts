// import {NextApiRequest, NextApiResponse} from "next";
// import twilio from "twilio";

// export default function sendMessage(req: NextApiRequest, res: NextApiResponse) {
// 	const accountSid = process.env.TWILIO_ACCOUNT_SID;
// 	const token = process.env.TWILIO_AUTH_TOKEN;
// 	const client = twilio(accountSid, token);
// 	const {phone, message} = req.body;

// 	console.log(phone, message);

// 	client.messages
// 		.create({
// 			body: "Testing again",
// 			from: "+18336587945",
// 			to: "+14807085773",
// 		})
// 		.then(message => console.log(message.sid));

// client.messages
// 	.create({
// 		body: message,
// 		from: <string>process.env.TWILIO_PHONE_NUMBER,
// 		to: phone,
// 	})
// 	.then(message =>
// 		res.json({
// 			success: true,
// 		})
// 	)
// 	.catch(error => {
// 		console.log(error);
// 		res.json({
// 			success: false,
// 		});
// 	});
// }

import {NextApiRequest, NextApiResponse} from "next";
import twilio from "twilio";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	console.log("FISHY");
	const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
	const token = <string>process.env.TWILIO_AUTH_TOKEN;
	const client = twilio(accountSid, token);
	const {phone, message} = req.body;
	try {
		const response = await client.messages.create({
			body: "Testing again",
			from: "+18336587945",
			to: "+13855289781",
		});

		return new Response(response.sid, {status: 200});
	} catch (error) {
		console.log(error);
		return new Response("Error", {status: 400});
	}
}
