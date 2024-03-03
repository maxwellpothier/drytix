import twilio from "twilio";

export async function POST(req: Request) {
	const reqBody = await req.json();

	const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
	const token = <string>process.env.TWILIO_AUTH_TOKEN;
	const client = twilio(accountSid, token);
	const {phone, message} = reqBody;
	try {
		const response = await client.messages.create({
			body: message,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: phone,
		});

		return new Response(response.sid, {status: 200});
	} catch (error) {
		console.log(error);
		return new Response("Error", {status: 400});
	}
}
