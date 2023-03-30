import React from 'react'
import { useSelector } from 'react-redux';
import PaginateLink from './PaginateLink';
const Paginate = () => {
    const { pages } = useSelector((state) => state.places);
    console.log("Pages="+pages)


    return (
        <div>
            {pages.map((page,i) => (
                <p key={i}>
                    <PaginateLink page={page}/>
                </p>
            ))}

        </div>
    )
}

export default Paginate
