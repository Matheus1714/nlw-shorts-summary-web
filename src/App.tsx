import { Play } from '@phosphor-icons/react'
import { FormEvent, useEffect, useState } from 'react'
import './App.css'
import { api } from './lib/axios'

enum VideoContentStatus {
  LoadingResume = 'Realizando o resumo...',
  LoadingAudio = 'Obtendo o texto do áudio...',
  Invalid = 'Esse vídeo não parece ser um short',
  Default = 'Escolha um short para resumir',
}

export function App(){

  const [videoURL, setVideoURL] = useState<string | null>(null)
  const [videoContent, setVideoContent] = useState<VideoContentStatus | string>(VideoContentStatus.Default)

  useEffect(() => {
    if (!videoURL) {
      setVideoContent(VideoContentStatus.Default)
    } else if (!videoURL.includes('shorts')) {
      setVideoContent(VideoContentStatus.Invalid)
    }
  }, [videoURL])

  async function handleFormSubmitURL(event: FormEvent){
    event.preventDefault()

    if(!videoURL){
      return
    }
    if(!videoURL.includes('shorts')){
      return
    }

    const [, params] = videoURL.split('/shorts/')
    const [videoId] = params.split('?si')
    
    setVideoContent(VideoContentStatus.LoadingAudio)

    const transcription = await api.get(`/summary/${videoId}`)
    
    setVideoContent(VideoContentStatus.LoadingResume)

    const summary = await api.post('/summary', { text: transcription.data.result })

    setVideoContent(summary.data.result)
  }

  return (
    <div className='container' onSubmit={handleFormSubmitURL}>
      <img src='/logo.svg' alt='logo'/>
      <h1>Shorts Summary</h1>

      <form id='form'>
        <input 
          type='url'
          id='url'
          placeholder='URL do vídeo'
          onChange={(e) => setVideoURL(e.target.value)}
        />
        <button title='Resumir'><Play/></button>
      </form>

      <h2>Resumo</h2>
      <p id='content' className={videoContent === VideoContentStatus.Default ? "placeholder" : ""}>{videoContent}</p>
    </div>
  )
}