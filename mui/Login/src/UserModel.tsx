export type User = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    address?: string
    phone?: string
}

export type action = {
    type: string,
    data: User
}

const UserReducer = (state: User, action: action): User => {
    switch (action.type) {
        case 'CREATE':
            state.firstName = action.data.firstName !== state.firstName ? action.data.firstName : state.firstName
            state.lastName = action.data.lastName !== state.lastName ? action.data.lastName : state.lastName
            state.password = action.data.password !== state.password ? action.data.password : state.password
            return state
        case 'UPDATE':
            return { ...state, ...action.data }
        case 'DELETE':
            state.firstName = ''
            state.password = ''
            return state
        default:
            return state
    }
}
export default UserReducer