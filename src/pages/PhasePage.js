import React from "react";
import { v4 as uuid } from "uuid";
import {
	DotsHorizontalIcon,
	CheckIcon,
	PlusIcon,
} from "@heroicons/react/outline";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";

import Task from "../components/Task";
import { ToggleMenu, ToggleMenuButton } from "../components/ToggleMenu";
import { Modal, ModalButton, ModalTitle, ModalText } from "../components/Modal";

function PhasePage(props) {
	const listTitleRef = React.useRef();
	const newTaskTextRef = React.useRef();
	const newTaskDateRef = React.useRef();

	const [isEditting, setIsEditting] = React.useState(false);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [title, setTitle] = React.useState(props.phase.title);
	const [complete, setComplete] = React.useState(props.phase.complete);
	const tasks = props.tasks.filter((task) => task.phase === props.phase.id);

	function addTaskHandler(e) {
		e.preventDefault();
		const task = {
			id: uuid(),
			text: newTaskTextRef.current.value,
			phase: props.phase.id,
		};

		if (task.text.trim() !== "") props.onAddTask(task);
		newTaskTextRef.current.value = "";
	}

	function editButtonHandler() {
		if (isEditting) {
			props.onEditList({ id: props.phase.id, title: title });
			setIsEditting(false);
			//setIsMenuToggled(false);
		} else {
			setIsEditting(true);
		}
	}

	function editInputHandler(e) {
		setTitle(listTitleRef.current.value);
	}

	function removeHandler() {
		props.onRemoveList(props.phase.id);
	}

	function toggleModalHandler() {
		setIsModalOpen(!isModalOpen);
	}
	function markInComplete(){
		props.onEditList({ id: props.phase.id, title: props.phase.title, completed: false });
	}
	function markComplete(){
		props.onEditList({ id: props.phase.id, title: props.phase.title, completed: true });
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center mb-2">
				<div className="w-4 h-4 ml-2 mr-4">
					<div className="w-full h-full bg-blue-500 rounded"></div>
				</div>

				{isEditting && (
					<form
						className="flex flex-grow"
						onSubmit={editButtonHandler}
					>
						<input
							type="text"
							value={title}
							className="text-3xl flex-grow font-medium bg-transparent outline-none border-b-2 border-black border-opacity-10 dark:text-white dark:border-white dark:border-opacity-20"
							ref={listTitleRef}
							onChange={editInputHandler}
							autoFocus={true}
						/>
						<button className="flex-none p-2 dark:text-white">
							<CheckIcon className="h-6 w-6" />
						</button>
					</form>
				)}

				{!isEditting && (
					<h1 className="text-3xl border-b-4 border-transparent font-medium flex-grow dark:text-white">
						{title}
					</h1>
				)}

				{!isEditting && (
					<ToggleMenu>
						<DotsHorizontalIcon className="h-6 w-6 text-opacity-90 dark:text-white dark:text-opacity:90" />
						<div className="flex flex-col text-sm">
							<ToggleMenuButton onClick={editButtonHandler}>
								<PencilIcon className="h-5 w-5 mr-2" />
								Edit
							</ToggleMenuButton>
							<ToggleMenuButton onClick={toggleModalHandler}>
								<TrashIcon className="h-5 w-5 mr-2" />
								Delete
							</ToggleMenuButton>
							{
								props.tasks.length === 0 ? (
									<></>
								) : (
									props.phase.complete ? (
										<ToggleMenuButton onClick={markInComplete}>
											<TrashIcon className="h-5 w-5 mr-2" />
											InComplete
										</ToggleMenuButton>
									) : (
										<ToggleMenuButton onClick={markComplete}>
											<TrashIcon className="h-5 w-5 mr-2" />
											Complete
										</ToggleMenuButton>
									)
								)
							}

						</div>
					</ToggleMenu>
				)}
			</div>

			<Modal isOpen={isModalOpen} onModalExit={toggleModalHandler}>
				<ModalTitle>You're about to delete this phase</ModalTitle>
				<ModalText>
					All your tasks will be permanently removed and you won't see
					them again.
				</ModalText>
				<div className="flex flex-row justify-end">
					<ModalButton onClick={toggleModalHandler}>
						Cancel
					</ModalButton>
					<ModalButton onClick={removeHandler} isPrimary="true">
						Delete
					</ModalButton>
				</div>
			</Modal>

			<div className="flex flex-col my-4">
				{tasks.map((task) => (
					<Task
						key={task.id}
						task={task}
						onEdit={props.onEditTask}
						onRemove={props.onRemoveTask}
					/>
				))}

				<form
					onSubmit={addTaskHandler}
					className="flex flex-row justify-between align-top px-4 py-3 my-2 rounded-lg text-black dark:text-white bg-white opacity-75 hover:opacity-100 focus-within:opacity-100 dark:bg-black dark:opacity-75 dark:hover:opacity-100"
				>
					<button className="flex-none flex justify-center items-center w-6 h-6 mr-3 rounded-full hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-20">
						<PlusIcon className="flex-none w-4 h-4 text-black text-opacity-70 dark:text-white" />
					</button>
					<input
						type="text"
						className="outline-none font-medium w-full bg-transparent"
						placeholder="Add a new task"
						ref={newTaskTextRef}
					/>
				</form>
			</div>
		</div>

	);
}

export default PhasePage;
