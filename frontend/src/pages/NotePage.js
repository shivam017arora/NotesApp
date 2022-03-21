import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const NotePage = () => {

    let params = useParams()
    let navigate = useNavigate()
    let id = params.id //ID from the URL
    let [note, setNote] = useState(null)
    let csrftoken = Cookies.get('csrftoken')

    const getNote = async () => {
        if (id === 'new') return;
        let response = await fetch(`/api/note/${id}`);
        let data = await response.json()
        setNote(data)
    }

    useEffect(() => {
        getNote()
    }, [setNote]);

    let updateNote = async () => {
        fetch(`/api/note/${id}/update`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(note)
        })
    }

    let createNote = async () => {
        fetch(`/api/notes/create`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/note/${id}/delete`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
        })
        navigate('/')
    }

    let handleSubmit = () => {
        if (id !== 'new' && note.body === '') {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note !== null) {
            createNote()
        }
        navigate('/')
    }

    let handleChange = (e) => {
        setNote((prevState) => ({
            ...prevState,
            body: e.target.value,
        }))
    }

    return (
        <div className='note'>
            <div className='note-header' onClick={handleSubmit}>
                <h3> <ArrowLeft /> </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button>Done</button>
                )}

            </div>
            <textarea value={note?.body} onChange={handleChange}></textarea>
        </div>
    )
}

export default NotePage