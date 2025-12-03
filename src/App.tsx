import './App.css'
import Modal from './components/modal'

function App() {

  return (
    <Modal title="Подтверждение действия">
      <p>Вы уверены, что хотите удалить файл?</p>
      <button>Да</button>
      <button className='cancel'>Нет</button>
    </Modal>
  )
}

export default App
