export const todosReducer = (initialState, action) => {
    switch (action.type) {
      case "Add Todo":
        return [...initialState, action.payload];
  
      case "Del Todo":
        // Retornarà un nou array amb tots els elements menys el de l'id
        return initialState.filter((todo) => todo.id !== action.payload);
  
      case "Toggle Todo":
        return initialState.map((todo) => {
          if (todo.id === action.payload) {
            //id
            return { ...todo, done: !todo.done }; // invertim el done
          }
          return todo;
        });
      default:
        return [...initialState];
    }
  };
  