import { useState, useEffect } from 'react'
import { FiArrowLeft, FiLink, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './links.css'

import LinkItem from '../../components/LinkItem'

import {getLinksSave, deleteLink} from '../../services/storeLinks'

export default function Links() {
    const [listLinks, setListLinks] = useState([])
    const [data, setData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [emptyList, setEmptyList] = useState(false)
 
    useEffect(() => {
        
        async function getLinks(){
            const response = await getLinksSave('@encurtaLink')

            if(response.length === 0){
                setEmptyList(true)
            }
            setListLinks(response)

        }

        getLinks()

    }, [])

    function handleOpenLink(link){
        setData(link)
        setShowModal(true)
    }

    async function handleDelete(id){
        const result = await deleteLink(listLinks, id)

        if(result.length === 0){
            setEmptyList(true)
        }

        setListLinks(result)
    }

    return (
        <div className='links-container'>
            <div className='links-header'>
                <Link to="/">
                    <FiArrowLeft size={38} color="#fff" />
                </Link>
                <h1>Meus Links</h1>
            </div>

            {emptyList && (
                <div className='links-item'> 
                    <h2 className='empty-text'>Sua lista está vazia...</h2>
                </div>
            )}

            {listLinks.map(item => (
                <div key={item.id} className='links-item'>
                    <button className='link' onClick={() => handleOpenLink(item)}>
                        <FiLink size={18} color="#fff" />
                        {item.long_url}
                    </button>
                    <button className='link-delete' onClick={() => handleDelete(item.id)}>
                        <FiTrash size={24} color="ff5454" />
                    </button>
                </div>
            ))}

            {showModal && (
                <LinkItem
                    closeModal={() => setShowModal(false)}
                    content={data} 
                />
            )}
        </div>
    )
}