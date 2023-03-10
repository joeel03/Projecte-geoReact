export const placeMarkReducer = (initialState, action) => {
    switch (action.type) {
      case "Save Mark":
        console.log(action.payload)
        return [...initialState, action.payload];
  
      case "Del Mark":
        // Retornarà un nou array amb tots els elements menys el de l'id
        return initialState.filter((mark) => mark.id !== action.payload);
  
   
    }
  };
  