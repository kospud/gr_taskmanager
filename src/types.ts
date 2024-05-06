import { UniqueIdentifier } from "@dnd-kit/core";
import { ReactNode } from "react";

//Свойства пользователя
interface User {
    authorized: boolean,
    userName: string,
    userEmail: string,
    token: string
}

//Состояние контекста аутентификации
export type AuthContextStateType = [User | undefined, React.Dispatch<React.SetStateAction<User>>];

//Тип контекста аутентификации
export type AuthContextType = AuthContextStateType | undefined;

//Свойства элемента меню приложения
export interface MenuItemProps {
    path: string,
    text: string,
    icon: ReactNode
}

enum display {
    board,
    list
}

export interface projectType {
    typeId: number,
    typeName: string
}

interface projectsToolBarState {
    projectTypes: projectType[]
    currentProjectType: projectType,
    setCurrentProjectType: React.Dispatch<React.SetStateAction<projectType>>
}

export type projectsToolBarContext = projectsToolBarState | undefined;

export type Column ={
    id: UniqueIdentifier,
    title: string
}

export type TaskType={
    id: UniqueIdentifier,
    columnId: UniqueIdentifier,
    title: string
}