import React from 'react'
import { Link } from 'react-router-dom';

const Footer_Column = ({ heading, list }) => {
    
    return (

        <section className="min-w-[250px] md:min-w-[0px] mx-auto sm:mx-0">
            <h3 className='text-xl font-semibold'>{heading}</h3>
            <ul className='my-3 space-y-2'>
                {
                    list.map((item) => {
                        return <li key={item.id}>
                                     {item.link?<Link to="/">{item.list_item}</Link>:<p>{item.list_item}</p>}
                                </li>
                    })
                }
            </ul>
        </section>

    )
}

export default Footer_Column
