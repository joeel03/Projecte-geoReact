import React from 'react'

import { useDispatch } from 'react-redux'

import { setPage } from '../slices/places/placeSlice';

export const PaginateLink = ({ n }) => {

    const dispatch = useDispatch();

    return (
        <div>
            {n.active ? (
                <>
                    <li>
                        <a
                            class="btn btn-primary rounded-pill py-2 px-4 text-lg fw-bold text-white"
                            href="#!"
                        >
                            {/* Para eliminar las comillas */}
                            <div dangerouslySetInnerHTML={{ __html: n.label }} />
                        </a>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        {/* Artificio para obtener el número de página de la URL */}
                        <a
                            onClick={(e) => {
                                if (n.url != null) dispatch(setPage(n.url.split("=")[1]))
                            }}
                            class="btn btn-outline-secondary rounded-pill py-2 px-4 text-lg text-dark"
                            href="#!"
                        >
                            <div dangerouslySetInnerHTML={{ __html: n.label }} />
                        </a>
                    </li>
                </>
            )}
        </div>
    )


}