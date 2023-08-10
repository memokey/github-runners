import React from "react";
import { DOTS } from "./hooks/usePagination";

type PaginatorType = {
  currentPage: number;
  setCurrentPage: Function;
  totalCount: number;
  siblingCount: number;
  pageSize: number;
  paginationRange: any;
}

const Paginator = (props: PaginatorType) => {
  // If there are less than 2 times in pagination range we shall not render the component
  if (props.currentPage === 0 || props.paginationRange.length < 2) {
    return null;
  }
  
  let lastPage = props.paginationRange[props.paginationRange.length - 1];

  const onNext = () => {
    if(props.currentPage === lastPage) {
      return ;
    }
    props.setCurrentPage(props.currentPage + 1);
  };

  const onPrevious = () => {
    if(props.currentPage === 1) {
      return ;
    }
    props.setCurrentPage(props.currentPage - 1);
  };

  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end mt-2 mx-[60px]">
      <div>
        <nav className="isolate cursor-pointer inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <div 
            className={`relative ${props.currentPage === 1 && 'cursor-not-allowed'} inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            onClick={onPrevious}
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </div>
          {
            props.paginationRange.map((pageNumber: any, index: number) => {
              // If the pageItem is a DOT, render the DOTS unicode character
              if (pageNumber === DOTS) {
                return <span key={index} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>;
              }

              // Render our Page Pills
              return (
                <div 
                  key={index}
                  aria-current="page" 
                  className={`relative z-10 inline-flex items-center ${pageNumber === props.currentPage? 'bg-[#64748b] text-white': 'text-gray-900'} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  onClick={() => props.setCurrentPage(pageNumber)}
                >{pageNumber}</div>
              );
            })
          }
          <div 
            className={`relative ${props.currentPage === lastPage && 'cursor-not-allowed'} inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            onClick={onNext}
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Paginator;