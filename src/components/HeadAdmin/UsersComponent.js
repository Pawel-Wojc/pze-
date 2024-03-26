export default function Users (){
    const users = [
        {
          id: 1,
          name: "Adam",
          surname: "Kowalski",
          email: "adam@example.com",
          role: "Teacher"
        },
        {
          id: 2,
          name: "Anna",
          surname: "Nowak",
          email: "anna@example.com",
          role: "Student"
        }
      ];
    return (
        <>
             <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Surname: {user.surname}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </li>
        ))}
      </ul>
        
        </>

    )

}