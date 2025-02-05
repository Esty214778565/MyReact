import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { object, string } from "yup"
import { RecipeType } from "./type"
import { AppDispatch, fetchAddRecipe } from "./RecipeStore"
import { useDispatch } from "react-redux"
import { useContext, useState } from "react"
import { UserContext } from "../HomePage"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

const schema = object({
    title: string().required(),
    description: string().required(),
    ingredients: string().required(),
    instructions: string().required()
}).required()
export type typeForForm = {
    title: string,
    description: string,
    ingredients: string,
    instructions: string
}
const AddRecipe = () => {
    const [user] = useContext(UserContext);
    const dispatch: AppDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {
        formState: { errors },
        register,
        watch,
        handleSubmit,
        reset,
    } = useForm({ resolver: yupResolver(schema) })
    console.log(watch("title"))
    const onSubmit = (data: typeForForm) => {
        const new_data: RecipeType = { title: data.title, description: data.description, ingredients: data.ingredients.split(","), instructions: data.instructions }
        dispatch(fetchAddRecipe({ recipe: new_data, user: user }));
        reset()
        handleClose();
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (<>
        <div>
            <button
                onClick={handleOpen}
                style={{
                    margin: '0.5em', padding: '0.5em 1em', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#303f9f')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3f51b5')}
            >
                Add Recipe
            </button>
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Submit Recipe</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("title", { required: "Title is required" })}
                        label="Title"
                        fullWidth
                        error={!!errors.title}
                        helperText={errors.title ? errors.title.message : ""}
                        margin="normal"
                    />
                    <TextField
                        {...register("description", { required: "Description is required" })}
                        label="Description"
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description ? errors.description.message : ""}
                        margin="normal"
                    />
                    <TextField
                        {...register("ingredients", { required: "Ingredients are required" })}
                        label="Ingredients"
                        fullWidth
                        error={!!errors.ingredients}
                        helperText={errors.ingredients ? errors.ingredients.message : ""}
                        margin="normal"
                    />
                    <TextField
                        {...register("instructions", { required: "Instructions are required" })}
                        label="Instructions"
                        fullWidth
                        error={!!errors.instructions}
                        helperText={errors.instructions ? errors.instructions.message : ""}
                        margin="normal"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">Send</Button>
            </DialogActions>
        </Dialog>
    </>)
}
export default AddRecipe