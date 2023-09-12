import './App.css'
import {Play} from '@phosphor-icons/react'

export function App(){
  return (
    <div className="container">
      <img src="/logo.svg" alt='logo'/>
      <h1>Shorts Summary</h1>

      <form id="form">
        <input type='url' id="url" placeholder='URL do vídeo' />
        <button title='Resumir'><Play/></button>
      </form>

      <h2>Resumo</h2>
      <p id="content" className='placeholder'>Escolha um short para resumir</p>
    </div>
  )
}