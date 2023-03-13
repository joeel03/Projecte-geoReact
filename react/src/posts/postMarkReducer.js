export const postMarkReducer = (initialState, action) => {
    switch (action.type) {
      case "Save Mark":
        console.log(action.payload)
        return [...initialState, action.payload];
  
      case "Del Mark":
        return initialState.filter((mark) => mark.id !== action.payload); 
    }
  };
  