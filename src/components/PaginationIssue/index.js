import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function PaginationIssue({ pageNum, totalPage, setNextPage, setPrevPage, setFirstPage, setLastPage }) {
  return (
    <Pagination className='d-flex justify-content-center'>
      <Pagination.First onClick={setFirstPage} disabled={totalPage <= 1 || pageNum === 1 ? true : false} />
      <Pagination.Prev onClick={setPrevPage} disabled={totalPage <= 1 || pageNum === 1 ? true : false} />
      {pageNum !== 1 && <Pagination.Item onClick={setFirstPage}>{1}</Pagination.Item>}
      {2 < pageNum && <Pagination.Ellipsis/>}

      <Pagination.Item onClick={() => alert("Clicked")} disabled>{pageNum}</Pagination.Item>

      {pageNum + 1 < totalPage && <Pagination.Ellipsis/>}
      {pageNum !== totalPage && <Pagination.Item onClick={setLastPage}>{totalPage}</Pagination.Item>}
      <Pagination.Next onClick={setNextPage} disabled={totalPage <= 1 || pageNum === totalPage ? true : false} />
      <Pagination.Last onClick={setLastPage} disabled={totalPage <= 1 || pageNum === totalPage ? true : false} />
    </Pagination>
  )
}
