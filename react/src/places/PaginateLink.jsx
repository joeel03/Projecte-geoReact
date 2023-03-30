import React from 'react'
import { useDispatch } from 'react-redux'
import { setPage } from '../slices/places/placeSlice';

const PaginateLink = ({ page }) => {
  const dispatch = useDispatch();
  return (
    <div>
      {page.active ? (

        <>

          <li>

            <a

              class="relative block rounded bg-neutral-800 py-1.5 px-3 text-lg font-medium text-neutral-50 transition-all duration-300 dark:bg-neutral-900"

              href="#!"

            >

              {/* Per eliminar els &quote */}

              <div dangerouslySetInnerHTML={{ __html: page.label }} />

            </a>

          </li>

        </>

      ) : (

        <>

          <li>

            {/* Artifici per a obtenir el número de pàgina de la url */}
            <a onClick={(e) => { if (page.url != null) dispatch(setPage(page.url.split("=")[1])) }}
              class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#!"
            >
              <div dangerouslySetInnerHTML={{ __html: page.label }} />
            </a>
          </li>
        </>
      )
      }
    </div>
  )
}

export default PaginateLink
