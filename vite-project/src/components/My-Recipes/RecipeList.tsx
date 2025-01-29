import { useDispatch, useSelector } from "react-redux";
import RecipeDetails from "./RecipeDetails";
import { AppDispatch, fetchRecipes, RootState } from "./RecipeStore";
import { useEffect, useState } from "react";
import { RecipeType } from "../../type";
import { Box, List, ListItem, Typography } from "@mui/material";
import { Fastfood } from '@mui/icons-material';

const RecipeList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const recipes = useSelector((state: RootState) => state.recipes.recipes)
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch])

    const handleRecipeClick = (recipe: RecipeType) => {
        setSelectedRecipe(recipe);
    };

    return (
        <div>

            <Box
                sx={{
                    position: 'fixed',
                    top: '20%',
                    right: '0',
                    width: '250px',
                    bgcolor: '#ffffff',
                    boxShadow: 3,
                    p: 2,
                    borderRadius: 2,
                    overflowY: 'auto',
                    maxHeight: '80%',
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                    My Recipes
                </Typography>
                <List>
                    {recipes.map((recipe) => (
                        <ListItem
                            key={recipe.id}
                            onClick={() => handleRecipeClick(recipe)}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    bgcolor: '#f5f5f5',
                                },
                                borderRadius: 1,
                                mb: 1,
                                p: 1,
                            }}
                        >
                            <Fastfood sx={{ mr: 1 }} />
                            {recipe.title}
                        </ListItem>
                    ))}
                </List>

            </Box>

            {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
        </div>
    );
};

export default RecipeList;