import NoteBox from "../NoteBox/NoteBox"

const Todo = ({ message }) => <NoteBox message={message ? `TODO: ${message}` : "TODO"} />

export default Todo
