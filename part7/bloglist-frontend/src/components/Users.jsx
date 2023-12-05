import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initialStateUsers } from "../reducers/usersReducer"

const Users = () => {

    const dispatch = useDispatch()
    const usersList = useSelector(({ users }) => {return users})

    useEffect(() => {
        dispatch(initialStateUsers())
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                    <th></th>
                    <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.blogs.length}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users