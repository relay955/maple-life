import type {Character} from "./dto/character";
import type {Todo} from "./dto/todo";

export const loadCharacters = ():Character[] =>
    JSON.parse(window.localStorage.getItem("characters") ?? "[]")

export const saveCharacters = (characters:Character[]) =>
    window.localStorage.setItem("characters", JSON.stringify(characters))

export const loadTodos = ():Todo[] =>
    JSON.parse(window.localStorage.getItem("todos") ?? "[]")

export const saveTodos = (todos:Todo[]) =>
    window.localStorage.setItem("todos", JSON.stringify(todos))
