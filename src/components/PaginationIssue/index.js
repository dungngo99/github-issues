import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function PaginationIssue({ pageNum, totalPage, setNextPage, setPrevPage, setFirstPage, setLastPage, setPage, JumptoPage,loading}) {
  return (
    <Pagination className='d-flex justify-content-center'>
      <Pagination.First onClick={setFirstPage} disabled={loading && (totalPage <= 2 || pageNum <= 2) ? true : false} />
      <Pagination.Prev onClick={setPrevPage} disabled={loading && (totalPage <= 2 || pageNum <= 2) ? true : false} />

      {pageNum >= 3 && <Pagination.Item onClick={setFirstPage}>{1}</Pagination.Item>}
      {2 < pageNum && <Pagination.Ellipsis onClick={JumptoPage} />}

      {pageNum - 1 > 0 && <Pagination.Item onClick={() => setPage(pageNum - 1)}>{pageNum - 1}</Pagination.Item>}
      <Pagination.Item onClick={() => alert("Clicked")} disabled>{pageNum}</Pagination.Item>
      {pageNum + 1 <= totalPage && <Pagination.Item onClick={() => setPage(pageNum + 1)}>{pageNum + 1}</Pagination.Item>}

      {pageNum + 2 < totalPage && <Pagination.Ellipsis onClick={JumptoPage}/>}
      {pageNum + 2 <= totalPage && <Pagination.Item onClick={setLastPage}>{totalPage}</Pagination.Item>}

      <Pagination.Next onClick={setNextPage} disabled={loading && (totalPage <= 2 || pageNum + 2 >= totalPage) ? true : false} />
      <Pagination.Last onClick={setLastPage} disabled={loading && (totalPage <= 2 || pageNum + 2 >= totalPage) ? true : false} />
    </Pagination>
  )
}
