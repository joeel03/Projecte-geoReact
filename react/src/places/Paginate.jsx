import React from 'react'
import { useSelector } from 'react-redux';
import PaginateLink from './PaginateLink';
const Paginate = () => {
    const { isSaving = true, error, isLoading, place, favorite, page, pages } = useSelector((state) => state.places);
    console.log(pages)
    console.log(page)

    return (
        <div>
            {(pages).map((page) => (
                <p key={page.id}>
                    <PaginateLink/>
                </p>
            ))}

        </div>
    )
}

export default Paginate
