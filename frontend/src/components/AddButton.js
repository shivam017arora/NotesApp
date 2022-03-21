import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddButtonSVG } from '../assets/add.svg'

const AddButton = () => {
    return (
        <div>
            <Link to='/note/new' className='floating-button'>
                <AddButtonSVG />
            </Link>
        </div>
    )
}

export default AddButton