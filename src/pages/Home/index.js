import { useState } from 'react'
import { FiLink } from 'react-icons/fi'

import './home.css'

import Menu from '../../components/Menu'
import LinkItem from '../../components/LinkItem'

import api from '../../services/api'


export default function Home() {
    const [link, setLink] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState({})

    async function handleShortLink(){
        try{
            const response = await api.post('/shorten', {
                long_url: link
            })

            setData(response.data)
            setShowModal(true)
            setLink('')
        }
        catch{
            alert('Ops! Parece que alguma coisa deu errado!')
            setLink('')
        }
    }

    return (
        <div className="container-home">

            <div className="logo">
                <img src="./logo.png" alt="Sujeito Link Logo" />

                <h1>Sujeito Link</h1>
                <span>Cole o seu link para encurtar 👇</span>
            </div>

            <div className="area-input">
                <div>
                    <FiLink size={24} color="#fff" />
                    <input
                        placeholder='Cole o seu link aqui...'
                        value={link}
                        onChange={e => setLink(e.target.value)}
                    />
                </div>

                <button onClick={handleShortLink}>Encurtar link</button>
            </div>

            <Menu />

            {showModal && (
                <LinkItem 
                    content={data} 
                    closeModal={() => setShowModal(false)} 
                />
            )}

        </div>
    )
}