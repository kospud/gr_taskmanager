import { Folder, Task, Analytics, Settings } from "@mui/icons-material";
import MenuItem from './MenuItem'
import { WORKSPACE_TASKS_ROUTE, WORKSPACE_PROJECTS_ROUTE, WORKSPACE_SETTINGS_ROUTE, WORKSPACE_ANALYTICS_ROUTE } from "../../utils/consts";
import { MenuItemProps } from "../../types/types";
import { memo } from "react";

const menuItems: MenuItemProps[] = [
    {
        text: 'Проекты',
        path: WORKSPACE_PROJECTS_ROUTE,
        icon: <Folder />
    },
    {
        text: 'Задачи',
        path: WORKSPACE_TASKS_ROUTE,
        icon: <Task />
    },
    {
        text: 'Аналитика',
        path: WORKSPACE_ANALYTICS_ROUTE,
        icon: <Analytics />
    },
    {
        text: 'Настройки',
        path: WORKSPACE_SETTINGS_ROUTE,
        icon: <Settings />
    }
];

const Menu = memo(() => {

    return (
        <div className="menu">
            <ul className="menuItems">
                {menuItems.map(menuItem => <MenuItem key={menuItem.text} text={menuItem.text} path={menuItem.path} icon={menuItem.icon} />)}
            </ul>
        </div>
    )
})

export default Menu;