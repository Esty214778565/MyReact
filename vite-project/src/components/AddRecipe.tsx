import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { array, object, string } from "yup"
import { RecipeType } from "../type"
const schema = object({
    title: string().required(),
    description: string().required().length(10, 'must be 10'),
    ingredients: array().of(string().required()).required(),
    instructions: string().required()
}).required()

const AddRecipe = ({ addToList }: { addToList: Function }) => {
    const {
        formState: { errors },
        register,
        watch,
        handleSubmit,
        reset,
    } = useForm({ resolver: yupResolver(schema) })

    console.log(watch("title"))

    const onSubmit = (data: RecipeType) => {
        addToList(data)
        reset()
    }
    // title,
    // description,
    // products,
    // ingredients,
    // instructions
    return (<>
        <form onSubmit={handleSubmit(onSubmit)} >
            <label> title:
                <input {...register("title")} />
            </label>
            {errors.title && <div>{errors.title.message}</div>}
            <br />
            <label> description:
                <input {...register("description")} />
            </label>
            {errors.description && <div>{errors.description.message}</div>}
            <br />
            <label> ingredients:
                <input {...register("ingredients")} />
            </label>
            {errors.ingredients && <div>{errors.ingredients.message}</div>}
            <br />
            <label> instructions:
                <input {...register("instructions")} />
            </label>
            {errors.instructions && <div>{errors.instructions.message}</div>}
            <br />
            <button type="submit">Send</button>
        </form>
    </>)
}

export default AddRecipe