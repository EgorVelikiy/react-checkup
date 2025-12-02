import UserProfile from './components/user/user-profile'
import './App.css'
import { users } from './mocks/user'

function App() {
  return (
    <ul>
      {users.map((user => (
        <li key={user.email}>
          <div className='card'>
            <UserProfile user={user} />
          </div>
        </li>
      )))}
    </ul>
  )
}

export default App
