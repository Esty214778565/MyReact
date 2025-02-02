import { Box, List, ListItem, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchRecipeById, RootState } from "./RecipeStore";
import { useEffect } from "react";

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const recipe = useSelector((state: RootState) => state.recipes.selectedRecipe);

    useEffect(() => {
        if (id) {
            console.log("Fetching recipe with ID:", id);
            dispatch(fetchRecipeById(id));
        }
    }, [dispatch, id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }
    return (

        <Box
            sx={{
                padding: 2,
                border: '2px solid #ff9800', // Orange border
                borderRadius: 2,
                boxShadow: 2,
                maxWidth: 600,
                margin: '20px 0 0 0',
                position: 'relative',
                left: '0',
            }}
        >
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#d32f2f' }}> {/* Dark red text */}
                {recipe.title}
            </Typography>
            <Typography variant="body1" component="p" sx={{ color: '#1976d2' }}> {/* Blue text */}
                <strong>Author ID:</strong> {recipe.authorId}
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginY: 1, color: '#424242' }}> {/* Dark gray text */}
                {recipe.description}
            </Typography>
            <Typography variant="h6" component="h4" gutterBottom sx={{ color: '#388e3c' }}> {/* Green text */}
                Ingredients:
            </Typography>
            <List>
                {recipe.ingredients?.map((ingredient, index) => (
                    <ListItem key={index} sx={{ color: '#000' }}> {/* Black text for ingredients */}
                        {ingredient}
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6" component="h4" gutterBottom sx={{ color: '#f57c00' }}> {/* Orange text */}
                Instructions:
            </Typography>
            <Typography variant="body1" component="p" sx={{ color: '#424242' }}>
                {recipe.instructions}
            </Typography>
        </Box>
    );
}

export default RecipeDetails;