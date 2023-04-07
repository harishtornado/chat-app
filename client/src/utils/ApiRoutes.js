const port = process.env.PORT || 5000
const host = `http://localhost:${port}`

export const signUpRoute = `${host}/auth/signup`
export const loginRoute = `${host}/auth/login`
export const setAvatarRoute = `${host}auth//setAvatar`
export const allUsersRoute = `${host}/auth/allUsers`
export const sendMessageRoute = `${host}/messages/addMsg`
export const getAllMessageRoute = `${host}/messages/getMsg`