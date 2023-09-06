import React from 'react'
import { useSelector } from 'react-redux'

export default function About() {

    let lang = useSelector(state => state.language);

    return (
        <div className='pt-5'>
            <div className='mt-5'>About</div>
            <div>{lang}</div>
        </div>
    )
}
