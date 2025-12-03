import UserProfile from './components/user/user-profile'
import './App.css'
import { users } from './mocks/user'

function App() {
  return (
    <ul>
      {users.map(user => (
        <li className='card' key={user.email}>
            <UserProfile user={user} />
        </li>
      ))}
    </ul>
  )
}

export default App
