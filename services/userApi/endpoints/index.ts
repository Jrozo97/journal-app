import user from './user'

const endpoints = (builder:any) => ({
    ...user(builder)
})

export default endpoints;


