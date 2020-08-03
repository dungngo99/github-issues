import React from 'react'
import { Form, Button } from 'react-bootstrap'
import './style.css'

export default function Search({handleSubmit, searchTerm, handleChange}) {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSearch" className='row d-flex justify-content-center m-0'>
          <Form.Label className='col-md-1 dn-search-label'>Search</Form.Label>
          <Form.Control
            controlid='search'
            className='col-md-7 dn-search-area'
            type="text" placeholder="Enter owner and repo"
            onChange={handleChange}
            value = {searchTerm}
          />
          <Button className='col-md-1 dn-search-btn' type='submit'>Search</Button>
        </Form.Group>
        <Form.Text className='text-muted'>Display issues in current repo</Form.Text>
      </Form>
    </div>
  )
}
