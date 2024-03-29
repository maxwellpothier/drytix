// Dashboard.tsx
"use client";

import React, {useEffect, useState} from "react";
import "./page.css";
import "react-toastify/dist/ReactToastify.css";
import {createClient} from "@supabase/supabase-js";
import TaskForm from "../../components/TaskForm";
import {sendMessage} from "../../utils/sendMessage";
import {toast, ToastContainer} from "react-toastify";
import Banner from "../../components/Banner";
import UserEditForm from "../../components/UserEditForm";

interface User {
	id: number;
	name: string;
	email: string;
	phone_number: string;
}

interface Task {
	id: number;
	customerName: string;
	itemName: string;
	isFinished: boolean;
	isPickedUp: boolean;
	items: number[];
	sentReminder: number;
	datePickedUp: number;
}

const Dashboard: React.FC = () => {
	const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
	const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
	const supabase = createClient(supabaseUrl, supabaseKey);

	const [users, setUsers] = useState<User[]>([]);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newUserName, setNewUserName] = useState<string>("");
	const [newEmail, setNewEmail] = useState<string>("");
	const [newPhone, setNewPhone] = useState<string>("");
	const [newTaskDescription, setNewTaskDescription] = useState<string>("");
	const [update, setUpdate] = useState(false);
	const [newTaskToggle, setNewTaskToggle] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [showEditForm, setShowEditForm] = useState(false);

	const openEditForm = (user: User) => {
		setEditingUser(user);
		setShowEditForm(true);
	};

	const closeEditForm = () => {
		setEditingUser(null);
		setShowEditForm(false);
	};

	const getCustomers = async () => {
		let {data: customers, error} = await supabase
			.from("customer")
			.select("id, name, email, phone_number");

		setUsers(customers);
	};

	const getItems = async () => {
		let {data: jobDetails, error} = await supabase
			.from("job")
			.select(
				"id, is_finished, item_id, customer_id, picked_up_timestamp, items, picked_up, sent_reminder, item(id, name), customer(id, name)"
			);
		const inProg: Task[] = jobDetails.map((item: any) => {
			const taskItem: Task = {
				id: item.id,
				customerName: item.customer.name,
				itemName: item.item.name,
				isFinished: item.is_finished,
				isPickedUp: item.picked_up,
				items: item.items,
				sentReminder: item.sent_reminder,
				datePickedUp: item.picked_up_timestamp,
			};
			return taskItem;
		});
		setTasks(inProg);
	};

	const insertRow = async () => {
		const {data, error} = await supabase
			.from("customer")
			.insert([{some_column: "someValue", other_column: "otherValue"}])
			.select();
	};

	useEffect(() => {
		getCustomers();
		getItems();
		setUpdate(false);
	}, [update]);

	const addUser = () => {
		if (
			newUserName.trim() !== "" &&
			newEmail.trim() !== "" &&
			newPhone.trim() !== ""
		) {
			const newUser: User = {
				id: users.length + 1,
				name: newUserName,
				email: newEmail,
				phone_number: newPhone,
			};
			setUsers([...users, newUser]);
			setNewUserName("");
		}
	};

	const addTask = () => {
		if (newTaskDescription.trim() !== "") {
			const newTask: Task = {
				id: tasks.length + 1,
				customerName: newTaskDescription,
				itemName: "shirt",
				isFinished: true,
				isPickedUp: false,
				items: [1, 2],
				sentReminder: null,
				datePickedUp: null,
			};
			setTasks([...tasks, newTask]);
			setNewTaskDescription("");
		}
	};

	return (
		<div className="dashboard-container">
			<Banner dashboard={true} />

			<div className="main-sections">
				<div className="section users">
					<h1>Users</h1>
					<ul>
						{users.map((user, i) => (
							<div key={i}>
								<li
									key={user.id}
									onClick={() => openEditForm(user)}>
									{editingUser?.id != user.id && user.name}
								</li>
								<div>
									{editingUser?.id == user.id &&
										showEditForm && (
											<UserEditForm
												user={editingUser}
												onClose={closeEditForm}
												onUpdate={getCustomers}
												triggerUpdate={setUpdate}
											/>
										)}
								</div>
							</div>
						))}
					</ul>
				</div>

				<div className="section progress">
					<div className="heading-container">
						<h1>In Progress</h1>
						<button
							onClick={() => setNewTaskToggle(!newTaskToggle)}>
							{!newTaskToggle ? "add new" : "cancel"}
						</button>
					</div>

					<ul>
						{tasks
							.filter(
								(task: Task) =>
									!task.isPickedUp && !task.isFinished
							)
							.map((task: Task) => (
								<li key={task.id}>
									<ClothingItem
										task={task}
										triggerUpdate={setUpdate}
									/>
								</li>
							))}
					</ul>
					<div className="heading-container">
						<h1>Completed</h1>
					</div>
					<ul>
						{tasks
							.filter(
								(task: Task) =>
									task.isFinished && !task.isPickedUp
							)
							.map((task: Task) => (
								<li key={task.id}>
									<ClothingItem
										task={task}
										triggerUpdate={setUpdate}
									/>
								</li>
							))}
					</ul>
					<div className="heading-container">
						<h1>Picked Up</h1>
					</div>
					<ul>
						{tasks
							.filter((task: Task) => task.isPickedUp)
							.map((task: Task) => (
								<li key={task.id}>
									<CompletedClothingItem
										task={task}
										triggerUpdate={setUpdate}
									/>
								</li>
							))}
					</ul>
				</div>
				{newTaskToggle && (
					<div className="section task-pop-up ">
						<TaskForm
							setToggle={setNewTaskToggle}
							triggerUpdate={setUpdate}></TaskForm>
					</div>
				)}
			</div>
			<ToastContainer />
		</div>
	);
};

const ClothingItem = (props: {task: Task; triggerUpdate}) => {
	const {task, triggerUpdate} = props;
	const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
	const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
	const supabase = createClient(supabaseUrl, supabaseKey);
	const [isComplete, setIsComplete] = useState(task.isFinished);
	const [sendReminder, setSendReminder] = useState();
	const lastReminder =
		new Date(task.sentReminder).toLocaleDateString() +
		" " +
		new Date(task.sentReminder).toLocaleTimeString();

	const handleDelete = async () => {
		const {data, error} = await supabase
			.from("job")
			.delete()
			.eq("id", task.id)
			.select();

		if (!error) {
			triggerUpdate(true);
		}
	};

	return (
		<div
			style={{
				backgroundColor: "#dddddd",
				borderRadius: 10,
				padding: 10,
			}}>
			<div>
				<h1>{task.customerName}: </h1>
				{task.items.map((item: any, index) => (
					<h1 className="clothing-text" key={index + item}>
						{item}
					</h1>
				))}
			</div>

			<div style={{display: "flex", flexDirection: "row"}}>
				{!isComplete ? (
					<button
						className="toggle"
						onClick={async () => {
							const {data, error} = await supabase
								.from("job")
								.select("customer_id")
								.eq("id", task.id);

							const {data: jobData, error: jobError} =
								await supabase
									.from("job")
									.update({is_finished: true})
									.eq("id", task.id)
									.select();

							setIsComplete(true);

							const {data: customer, error: customerError} =
								await supabase
									.from("customer")
									.select("phone_number")
									.eq("id", data[0].customer_id);

							toast.promise(
								sendMessage(
									customer[0].phone_number,
									"Your dry cleaning is complete!"
								),
								{
									pending: "Sending message...",
									success: "Message sent!",
									error: "Error sending message",
								}
							);
							triggerUpdate(true);
						}}>
						Mark complete
					</button>
				) : (
					<div>
						<button
							className="toggle"
							onClick={async () => {
								triggerUpdate(true);
								const {data, error} = await supabase
									.from("job")
									.update({
										picked_up: true,
										picked_up_timestamp: Date.now(),
									})
									.eq("id", task.id)
									.select();
							}}>
							Picked Up
						</button>
						<button
							className="toggle"
							onClick={async () => {
								triggerUpdate(true);
								const {data, error} = await supabase
									.from("job")
									.update({sent_reminder: Date.now()})
									.eq("id", task.id)
									.select();

								const {data: customer, error: customerError} =
									await supabase
										.from("customer")
										.select("phone_number")
										.eq("id", data[0].customer_id);

								toast.promise(
									sendMessage(
										customer[0].phone_number,
										"Reminder - Your dry cleaning is complete!"
									),
									{
										pending: "Sending reminder...",
										success: "Reminder sent!",
										error: "Error sending reminder",
									}
								);
								triggerUpdate(true);
							}}>
							{task?.sentReminder ? (
								<p>Reminder Sent: {lastReminder}</p>
							) : (
								<p>Send Reminder</p>
							)}
						</button>
					</div>
				)}

				<button className="delete" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};

const CompletedClothingItem = (props: {task: Task; triggerUpdate}) => {
	const {task, triggerUpdate} = props;
	const [sendReminder, setSendReminder] = useState(1);
	const datePickedUp =
		new Date(task.datePickedUp).toLocaleDateString() +
		" " +
		new Date(task.datePickedUp).toLocaleTimeString();

	return (
		<div
			style={{
				backgroundColor: "#dddddd",
				borderRadius: 10,
				padding: 10,
			}}>
			<div>
				<h1> {task.customerName}: </h1>
				{task.items.map((item: any, index) => (
					<h1 className="clothing-text" key={index + item}>
						{item}
					</h1>
				))}
			</div>

			<button className="toggle">
				<p>Picked Up: {datePickedUp}</p>
			</button>
		</div>
	);
};

export default Dashboard;
