import axios from "axios"
import { RecipeType } from "../../type";
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk('recipes/fetch', async (_, thunkAPI) => {
    try {
        const res = await axios.get("http://localhost:3000/api/recipes");
        return res.data as RecipeType[]
    }
    catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch recipes");
    }

})

interface RecipeState {
    recipes: RecipeType[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
};

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {}, //remember define an object
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state: RecipeState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle the error message
            });
    },
});

const store = configureStore({
    reducer: {
        recipes: recipeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// export default recipeSlice.reducer;
export const selectRecipes = (state: RootState) => state.recipes
