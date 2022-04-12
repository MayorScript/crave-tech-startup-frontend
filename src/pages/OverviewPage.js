import {
	isToday,
	isTomorrow,
	isThisWeek,
	isNextWeek,
	dueDateCompare,
} from "../helpers/dueDate";
import Task from "../components/Task";

function OverviewPage(props) {

	const totalTasksCount = props.tasks.length;
	return (
		<div className="flex flex-col dark:text-white">
			<div className="flex flex-row items-center mb-2">
				<div className="w-4 h-4 ml-2 mr-4">
					<div className="w-full h-full bg-blue-500 rounded"></div>
				</div>

				<h1 className="text-3xl border-b-4 border-transparent font-medium flex-grow ">
					Overview
				</h1>
			</div>
			<div className="flex flex-col my-4">
				{totalTasksCount === 0 ? (
					<div>
						You have no task yet.
					</div>

					): (
					<div>Total Task: {totalTasksCount}</div>
				)}

			</div>
		</div>
	);
}

export default OverviewPage;
