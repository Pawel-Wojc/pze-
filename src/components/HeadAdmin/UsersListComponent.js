import {useState, useEffect} from "react";

const Users = () => {
    const [users, setUsers] = useState ();
  return (
    <div>
        <h2>Users list</h2>
        {users?.length ?
            (
                <ul>
                    {users.map((user, id) => <li key={id}>{user?.name}</li>)}
                </ul>
            ) : <p>No users</p>
    
        }

    </div>
  )
}

export default Users