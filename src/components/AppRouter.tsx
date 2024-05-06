import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from '../utils/routes';
import { LOGIN_ROUTE, WORKSPACE_PROJECTS_ROUTE } from '../utils/consts'
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Header from "./Workspace/Header";
import Menu from "./Menu/Menu";
import './Workspace/workspace.css';


const AppRouter = () => {

    const user = useContext(AuthContext)![0]

    console.log('router')
    return user?.authorized ? (
        <div className="workspace">
            <Header />
            <div className="workspace_content">
                <Menu />
                <Routes>
                    {
                        privateRoutes.map(({ path, component }) => <Route key={path} path={path} Component={component} />)
                    }
                    <Route key={0} path='*' element={<Navigate replace to={WORKSPACE_PROJECTS_ROUTE} />} />
                </Routes>
            </div>
        </div>
    )
        :
        (
            <Routes>
                {
                    publicRoutes.map(({ path, component }) => <Route key={path} path={path} Component={component} />)
                }
                <Route key={0} path='*' element={<Navigate replace to={LOGIN_ROUTE} />} />
            </Routes>
        )

}

export default AppRouter;