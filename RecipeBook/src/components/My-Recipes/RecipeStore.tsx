import axios from "axios"
import { RecipeType } from "./type";
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../user/UserModel";

export const fetchRecipes = createAsyncThunk('recipes/fetch', async (_, thunkAPI) => {
    try {
        const res = await axios.get("http://localhost:3000/api/recipes");
        return res.data as RecipeType[]
    }
    catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch recipes");
    }
})

export const fetchAddRecipe = createAsyncThunk('recipes/add', async ({ recipe, user }: { recipe: RecipeType; user: User }, thunkApi) => {
    try {
        const res = await axios.post("http://localhost:3000/api/recipes", recipe, { headers: { 'user-id': user.id + '' } });
        const newRecipe = res.data as RecipeType;
        thunkApi.dispatch(fetchRecipes());
        console.log("succesfuli add recipe");
        return newRecipe;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
export const fetchRecipeById = createAsyncThunk(
    'recipes/fetchById',
    async (id: string, thunkAPI) => {
        const response = await thunkAPI.dispatch(fetchRecipes());
        const recipes = response.payload as RecipeType[];
        const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
        return recipe;
    }
);

export interface RecipeState {
    recipes: RecipeType[];
    loading: boolean;
    error: string | null;
    selectedRecipe: RecipeType | null;
}

const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
    selectedRecipe: null
};

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state: RecipeState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state: RecipeState, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state: RecipeState, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchRecipeById.pending, (state: RecipeState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipeById.fulfilled, (state: RecipeState, action) => {
                state.loading = false;
                state.selectedRecipe = action.payload ?? null;
                console.log("Fetched recipe:", action.payload);
            })
            .addCase(fetchRecipeById.rejected, (state: RecipeState, action) => {
                state.loading = false;
                state.error = action.payload as string;
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
export const selectRecipes = (state: RootState) => state.recipes
