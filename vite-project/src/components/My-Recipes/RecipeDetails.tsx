import { Box, List, ListItem, Typography } from "@mui/material";
import { RecipeType } from "../../type";

const RecipeDetails = ({ recipe }: { recipe: RecipeType }) => {
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
                {recipe.ingredients.map((ingredient, index) => (
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

        // <div className="recipe">
        //     <h2>{recipe.title}</h2>
        //     {/* check wat is strong */}
        //     <p><strong>Author ID:</strong> {recipe.authorId}</p>
        //     <p>{recipe.description}</p>
        //     <h4>Ingredients:</h4>
        //     {/* <ul>
        //                  {recipe.ingredients.map((ingredient, index) => (
        //                     <li key={index}>{ingredient}</li>
        //              ))}
        //             </ul> */}
        //     <h4>Instructions:</h4>
        //     <p>{recipe.instructions}</p>
        // </div>
    );
}

export default RecipeDetails;