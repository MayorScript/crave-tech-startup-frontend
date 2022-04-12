import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

import Wrapper from "./layouts/Wrapper";
import SideNavigation from "./layouts/SideNavigation";
import MainContent from "./layouts/MainContent";

import Search from "./components/Search";
import Phases from "./components/Phases";

import PhasePage from "./pages/PhasePage";
import OverviewPage from "./pages/OverviewPage";
import SearchPage from "./pages/SearchPage";

import useDarkMode from "./helpers/useDarkMode";

// Get phases and tasks from localStorage
let localData = {
  phases: [],
  tasks: [],
  theme: "light",
};
// If the JSON string isn't valid, we skip
try {
  const localLists = JSON.parse(localStorage.getItem("phases"));
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
  const localTheme = localStorage.getItem("theme");
  // Check that vars aren't null
  if (Array.isArray(localLists) && Array.isArray(localTasks)) {
    localData.phases = localLists;
    localData.tasks = localTasks;
  }
  if (localTheme) localData.theme = localTheme;
} catch {
  // If JSON string is invalid do nothing
}

function App() {
  // Get phases and tasks from localStorage
  const [phases, setListsState] = React.useState(localData.phases);
  const [tasks, setTasksState] = React.useState(localData.tasks);

  // use DarkMode
  const [theme, setTheme] = useDarkMode(localData.theme);

  function saveData(lists_, tasks_) {
    localStorage.setItem("phases", JSON.stringify(lists_));
    localStorage.setItem("tasks", JSON.stringify(tasks_));
  }

  function setLists(lists_) {
    setListsState(lists_);
    saveData(lists_, tasks);
  }

  function setTasks(tasks_) {
    setTasksState(tasks_);
    saveData(phases, tasks_);
  }

  function addList(phase) {
    setLists([...phases, phase]);
  }

  function editList(newList) {
    const tempLists = phases.slice();
    const index = tempLists.findIndex((phase) => phase.id === newList.id);
    Object.assign(tempLists[index], newList);
    setLists(tempLists);
  }

  function removeList(id) {
    const tempLists = phases.slice();
    const index = tempLists.findIndex((phase) => phase.id === id);
    tempLists.splice(index, 1);
    setLists(tempLists);
  }

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function editTask(newTask) {
    const tempTasks = tasks.slice();
    const index = tempTasks.findIndex((task) => task.id === newTask.id);
    Object.assign(tempTasks[index], newTask);
    setTasks(tempTasks);
  }

  function removeTask(id) {
    const tempTasks = tasks.slice();
    const index = tempTasks.findIndex((task) => task.id === id);
    tempTasks.splice(index, 1);
    setTasks(tempTasks);
  }

  return (
    <Router>
      <Wrapper>
        <SideNavigation>
          <Phases data={phases} onAddList={addList} />
        </SideNavigation>

        <MainContent>
          <div className="flex flex-row mb-6">
            <Search />
            <button
              className="hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center self-center"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>
          </div>
          <Switch>
            {phases.map((phase) => (
              <Route key={phase.id} path={"/phase/" + phase.id}>
                <PhasePage
                  phase={phase}
                  tasks={tasks}
                  onAddTask={addTask}
                  onEditTask={editTask}
                  onRemoveTask={removeTask}
                  onEditList={editList}
                  onRemoveList={removeList}
                />
              </Route>
            ))}

            <Route key="search" path="/search/:query">
              <SearchPage
                tasks={tasks}
                onEditTask={editTask}
                onRemoveTask={removeTask}
              />
            </Route>
            <Route key="overview" path="/">
              <OverviewPage
                tasks={tasks}
                onEditTask={editTask}
                onRemoveTask={removeTask}
                phases={phases}
              />
            </Route>
          </Switch>
        </MainContent>
      </Wrapper>
    </Router>
  );
}

export default App;
