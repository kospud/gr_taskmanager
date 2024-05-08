import { UniqueIdentifier } from "@dnd-kit/core";
import { Dispatch, ReactNode } from "react";

//Свойства пользователя
interface User {
    authorized: boolean,
    userName: string,
    userEmail: string,
    userID: number,
    token: string
}

export interface UserListItemState {
    userID: number,
    userName: string
}

//Состояние контекста аутентификации
export type AuthContextStateType = [User | undefined,
    React.Dispatch<React.SetStateAction<User>>,
    UserListItemState[],
];

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
    typeID: number,
    typeName: string
}

interface projectsToolBarState {
    projectTypes: projectType[]
    currentProjectType: projectType,
    setCurrentProjectType: React.Dispatch<React.SetStateAction<projectType>>
    newProject: number | null,
    setNewProject: React.Dispatch<React.SetStateAction<number | null>>
}

export type projectsToolBarContext = projectsToolBarState | undefined;

export interface projectListItemState {
    projectID: number,
    projectName: string
}

interface tasksToolBarState{
    users: UserListItemState[],
    user: UserListItemState,
    setUser: React.Dispatch<React.SetStateAction<UserListItemState>>
    projects: projectListItemState[],
    project: projectListItemState,
    setProject: React.Dispatch<React.SetStateAction<projectListItemState>>
    myTasksChecked: boolean,
    setMyTasksChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export type taskToolBarContext=tasksToolBarState | undefined
export type Column = {
    id: UniqueIdentifier,
    title: string,
    dataBaseId: number //Id в базе данных, костыль, надо придумать лучше
}

enum taskCardTypes{
    project,
    task
}

export type TaskType = {
    id: UniqueIdentifier, //числовой формат
    columnId: UniqueIdentifier,//'Сделать' | 'В работе' | 'Завершено'
    object: dataBaseProject | dataBaseTask | null,
    dataBaseId: number | [number, number]
    objectType: string
}

export type dataBaseTask={
    projectID: number,
    projectName: string,
    taskID: number,
    taskName: string,
    userID: number,
    statusID: number,
    statusName: string,
    startDatePlan: string | null,
    endDatePlan: string | null,
    stageNumber: number,
    stageDescription: string
}

export type dataBaseProject = {
    projectID: number,
    type: string,
    projectName: string, //Название проекта типа ППК_Имя клиента_фамилия клиента русские мужские имена
    userName: string, //Русское мужское имя
    userSurname: string, //Русская мужская фамилия
    stageID: number,
    endDate: string, //дата окончания проекта (плановая)
    startDate: string,//Дата начала проекта (плановая)
    stageEndDate: string//Дата окончания текущего этапа
    stageName: string, // 'Новое' | 'Cонграйтинг' | 'Аранжировка' | 'текст' | 'демо' | 'Подготовка к записи' | 'Запись' | 'Сведение' | 'Мастеринг'
    selected: number
}
