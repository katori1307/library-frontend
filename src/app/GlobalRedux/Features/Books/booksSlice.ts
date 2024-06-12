import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: number;
  name: string;
}

interface Book {
  category: Category;
  id: number;
  name: string;
  quantity: number;
}

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<Book>) => {},
  },
});

export const { setBooks, addBook, updateBook } = booksSlice.actions;
export default booksSlice.reducer;
