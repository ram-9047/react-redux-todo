export default function reducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat({
        value: action.payload,
        id: Date.now(),
        isCompleted: false
      });
    case "EDIT_TODO":
      return state.map(todo => {
        return todo.id === action.payload.id
          ? {
              ...todo,
              value: action.payload.value
            }
          : todo;
      });
    case "DELETE_TODO":
      return state.filter(todo => {
        return todo.id !== action.payload;
      });
    default:
      return state;
  }
}
