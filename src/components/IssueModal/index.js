import React, { useState, useEffect } from 'react'
import { Modal, Button, Alert, Card } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'
import './style.css'

export default function IssueModal({ item, hideModal, show }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);
  const [errMessage, setErrorMessage] = useState("Something wrong");
  let [commentList, setCommentList] = useState([])
  const [numPage, setNumPage] = useState(0)

  const loadMore = (event) => {
    const newPage = numPage + 1
    setNumPage(newPage)
  }

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      const url = item.comments_url + `?page=${numPage}&per_page=5`

      try {
        let response = await fetch(url)
        let data = await response.json()

        if (response.status === 200 && data.length >= 1) {
          setCommentList(commentList.concat(data))
        } else if (data.length <= 0) {
          setErrorMessage('No comment found')
          setError(true)
        }
        else {
          setErrorMessage(response.message)
          setError(true)
        }
      } catch (error) {
        setErrorMessage(error.message)
        setError(true)
      }
      setLoading(false)
    }

    if (numPage != 0) fetchComments()
  }, [numPage])

  return (
    <Modal show={show} onHide={hideModal} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{`#${item.number} ${item.title}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ReactMarkdown source={item.body} transformImageUri={(uri) => '...'}></ReactMarkdown>
      </Modal.Body>

      <Modal.Footer className='dn-modal-footer'>
        <div className='dn-modal-comment-area'>
          {commentList.length !== 0 && commentList.map((childItem, index) => {
            return (
              <ModalComment key={`cmt-${item.id}-${index}`} item={childItem} parentItem={item}></ModalComment>
            )
          })}
        </div>
        {!error && <Button onClick={loadMore}>Load more</Button>}
      </Modal.Footer>

      <div className='dn-add-ons-footer'>
        {loading && <ClipLoader size={100} color={"red"} style={{ 'margin': 'auto' }}></ClipLoader>}
        {error && <Alert variant="danger" className='text-center'>{errMessage}</Alert>}
      </div>
    </Modal>
  )
}

function ModalComment({ item, parentItem }) {
  return (
    <Card className='dn-modal-comment row'>
      <Card.Img className='col-md-2 dn-modal-image-top' variant="top" src={item.user.avatar_url} alt="..." />
      <Card.Body className='col-md-10 dn-modal-comment-body'>

        <Card.Title className='text-muted' style={{ 'fontSize': '13px' }}>
          <span className="text-grey mr-2">{`@${parentItem.user.login}`}</span>
          <span className="text-grey mr-2">
            Last updated: <Moment fromNow>{parentItem.updated_at}</Moment>
          </span>
          <span className="text-grey mr-2">{`Comments: ${parentItem.comments}`}</span>
        </Card.Title>

        <ReactMarkdown source={item.body}></ReactMarkdown>
      </Card.Body>
    </Card>
  )
}
