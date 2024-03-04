export const sendMessage = async (phone: string, message: string) => {
	try {
		const res = await fetch("/api", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone: phone,
				message: message,
			}),
		});
	} catch (error) {
		console.error("Error:", error);
	}
};
