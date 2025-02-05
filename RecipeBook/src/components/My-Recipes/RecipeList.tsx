import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchRecipes, RootState } from "./RecipeStore";
import { useEffect, useState } from "react";
import { RecipeType } from "./type";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { Fastfood } from '@mui/icons-material';
import { useNavigate } from "react-router";

const RecipeList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const recipes = useSelector((state: RootState) => state.recipes.recipes)
    const [showRecipes, setShowRecipes] = useState(false);

    const navigate = useNavigate();

    const handleRecipeClick = (recipe: RecipeType) => {
        console.log("enter handleRecipeClick");
        navigate(`/recipeDetails/${recipe.id}`);
    };

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch])
    const toggleRecipes = () => {
        setShowRecipes(true);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '20%',
                right: '0',
                width: '250px',
                bgcolor: 'transparent',
                p: 2,
                borderRadius: 2,
                overflowY: 'auto',
                maxHeight: '80%',
            }}
        >

            {!showRecipes && <Box display="flex" justifyContent="flex-end" alignItems="flex-start" height="100vh">
                <Button variant="contained" onClick={toggleRecipes} style={{ marginRight: '20px' }}>
                    {showRecipes ? 'Hide Recipes' : 'Show Recipes'}
                </Button>
            </Box>}

            {showRecipes && (<div>
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
            </div>)}
        </Box>
    );
};

export default RecipeList;


