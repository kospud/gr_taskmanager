import { LOGIN_ROUTE, WORKSPACE_TASKS_ROUTE, WORKSPACE_PROJECTS_ROUTE, WORKSPACE_ANALYTICS_ROUTE, WORKSPACE_SETTINGS_ROUTE } from "./consts";
import Projects from "../components/Workspace/Projects/Projects";
import Login from "../components/Login/Login";
import Tasks from "../components/Workspace/Tasks";
import Analytics from "../components/Workspace/Analytics";
import Settings from "../components/Workspace/Settings";


export const privateRoutes=[
    {
        path: WORKSPACE_PROJECTS_ROUTE,
        component: Projects
    },
    {
        path: WORKSPACE_TASKS_ROUTE,
        component: Tasks
    },
    {
        path: WORKSPACE_ANALYTICS_ROUTE,
        component: Analytics
    },
    {
        path: WORKSPACE_SETTINGS_ROUTE,
        component: Settings
    }
]

export const publicRoutes=[
    {
        path: LOGIN_ROUTE,
        component: Login

    }
]
