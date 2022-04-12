import React from "react";
import {
	CheckIcon,
	DotsHorizontalIcon,
	CalendarIcon,
	XIcon,
} from "@heroicons/react/outline";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";

import { ToggleMenu, ToggleMenuButton } from "./ToggleMenu";
import { dueDate } from "../helpers/dueDate";

function Task(props) {
	const taskTextRef = React.useRef();
	const taskDateRef = React.useRef();

	const [isEditting, setIsEditting] = React.useState(false);
	const [text, setText] = React.useState(props.task.text);
	const [taskDate, setTaskDate] = React.useState(null);
	const [isDone, setIsDone] = React.useState(props.task.isDone);

	function editButtonHandler(e) {
		if (isEditting) {
			e.preventDefault();
			let task = { id: props.task.id, text: text };


			if (task.text.trim() !== "") {
				props.onEdit(task);
				setIsEditting(false);
			}
		}
	}
	function editInputHandler() {
		setText(taskTextRef.current.value);
	}

	function doneHandler() {
		setIsDone(!isDone);
		props.onEdit({ id: props.task.id, isDone: !isDone });
	}

	function removeHandler() {
		return props.onRemove(props.task.id);
	}

	return (
		<div
			className={
				isDone
					? "flex flex-row justify-between align-top bg-white dark:bg-black dark:text-white px-4 py-3 my-2 rounded-lg opacity-50 focus-within:opacity-100"
					: "flex flex-row justify-between align-top bg-white dark:bg-black dark:text-white px-4 py-3 my-2 rounded-lg"
			}
		>
			{isDone ? (
				<div
					onClick={doneHandler}
					className="flex-none w-6 h-6 mr-3 border-2 border-green-600 text-green-700 rounded-full bg-green-400"
				>
					<CheckIcon className="h-5 w-5" />
				</div>
			) : (
				<div
					onClick={doneHandler}
					className="flex-none w-6 h-6 mr-3 border-2 rounded-full border-black border-opacity-5 bg-black bg-opacity-5 dark:border-white dark:border-opacity-10 dark:bg-white dark:bg-opacity-10"
				></div>
			)}

			{!isEditting && (
				<div
					className={
						isDone
							? "flex-grow font-medium line-through"
							: "flex-grow font-medium"
					}
				>
					{text}
				</div>
			)}

			{!isEditting && (
				<ToggleMenu>
					<DotsHorizontalIcon className="h-4 w-4" />
					<div className="flex flex-col text-sm text-black dark:text-white">
						<ToggleMenuButton onClick={editButtonHandler}>
							<PencilIcon className="h-5 w-5 mr-2" />
							Edit
						</ToggleMenuButton>
						<ToggleMenuButton onClick={removeHandler}>
							<TrashIcon className="h-5 w-5 mr-2" />
							Delete
						</ToggleMenuButton>
					</div>
				</ToggleMenu>
			)}

			{isEditting && (
				<form className="flex flex-grow" onSubmit={editButtonHandler}>
					<input
						type="text"
						value={text}
						className="flex-grow font-medium bg-transparent outline-none border-b-2 border-black border-opacity-10 dark:border-white dark:border-opacity-20 -mb-0.5"
						ref={taskTextRef}
						onChange={editInputHandler}
						autoFocus={true}
					/>

					<button className="flex-none p-1.5 -mt-0.5 -mb-0.5 -mr-1 rounded-full hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-20">
						<CheckIcon className="h-4 w-4" />
					</button>
				</form>
			)}
		</div>
	);
}

export default Task;
