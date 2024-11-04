import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    editItem: (state, action) => {
      const { id, details } = action.payload;
      const existingItem = state.find(item => item._id === id);
      if (existingItem) {
        existingItem.details = details;
      }
    },
    deleteItem: (state, action) => {
      return state.filter(item => item._id !== action.payload);
    },
    setItems: (state, action) => {
      return action.payload;
    },
  },
});

export const { addItem, editItem, deleteItem, setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
