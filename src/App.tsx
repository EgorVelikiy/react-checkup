import UserProfile from './components/user/user-profile'
import './App.css'
import { user } from './mocks/user'

function App() {
  return (
    <div className='card'>
      <UserProfile user={user} />
    </div>
  )
}

export default App
