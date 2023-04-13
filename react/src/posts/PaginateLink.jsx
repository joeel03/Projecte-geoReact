import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../slices/posts/postSlice';

export const PaginateLink = ({ page }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex-row">
      {page.active ? (
        <>
          <li className="d-inline flex-row">
            <a
              className="btn btn-primary rounded-pill py-2 px-4 text-lg fw-bold text-white"
              href="#!"
            >
              <div dangerouslySetInnerHTML={{ __html: page.label }} />
            </a>
          </li>
        </>
      ) : (
        <>
          <li className="d-inline flex-row">
            <a
              onClick={(e) => {
                if (page.url != null)
                  dispatch(setPage(page.url.split("=")[1]));
              }}
              className="btn btn-outline-secondary rounded-pill py-2 px-4 text-lg text-dark"
              href="#!"
            >
              <div dangerouslySetInnerHTML={{ __html: page.label }} />
            </a>
          </li>
        </>
      )}
    </div>
  );
};
