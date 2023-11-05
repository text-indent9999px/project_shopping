import React from "react";
import './pagination.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
    current: number,
    length: number,
    onPageChange: (newPage: number) => void;
    pageSet: number,
    output: number,
}

const Pagination: React.FC<PaginationProps> = ({current=1, length = 0, onPageChange, pageSet = 5, output = 3}) => {

    let startPage = Math.max(1,(current % pageSet === 0) ? (current - pageSet + 1) : (Math.floor(current / pageSet) * pageSet + 1));
    let endPage = Math.min((startPage + pageSet - 1), Math.ceil(length/output));

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const numberClickHandler = (newPage:number) => {
        onPageChange(newPage);
    }

    const prevClickHandler = (prevPage:number) => {
        if (prevPage <= 0){
            //disabled
        }else{
            onPageChange(prevPage);
        }
    }
    const nextClickHandler = (nextPage:number) => {
        if(nextPage > (length / output)){
            //disabled
        }else{
            onPageChange(nextPage);
        }
    }

    return (
        <>
            <div className="custom-pagination-area">
                <ul className="custom-pagination">
                    <li key={'prev'}
                        className={`custom-page ${startPage <= 1 ? 'disabled' : ''}`}
                        onClick={() => prevClickHandler(startPage - 1)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </li>
                    {pageNumbers.map((item) => (
                        <li className={`${item === current ? 'current' : ''} custom-page`} key={item} onClick={() => numberClickHandler(item)}>
                            {item}
                        </li>
                    ))}
                    <li key={'next'}
                        className={`custom-page ${endPage >= (length / output) ? 'disabled' : ''}`}
                        onClick={() => nextClickHandler(endPage + 1)}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Pagination;