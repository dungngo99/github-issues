import React, { useState} from 'react'
import { Modal, Button, Alert, Card } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'
import Moment from 'react-moment'
import './style.css'

export default function IssueModal({ item, hideModal, show }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);
  const [errMessage, setErrorMessage] = useState("Something wrong");
  const [commentList, setCommentList] = useState(null)

  const loadMore = async (event) => {
    event.preventDefault()
    setLoading(true)
    const url = item.comments_url

    try {
      let response = await fetch(url)
      let data = await response.json()

      if (response.status === 200 && data.length >= 1) {
        setCommentList(data)
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

  return (
    <Modal show={show} onHide={hideModal} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{`#${item.number} ${item.title}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{item.body}</p>
      </Modal.Body>

      <Modal.Footer className='dn-modal-footer'>
        <div className='dn-modal-comment-area'>
          {commentList && commentList.map((childItem, index) => {
            return (
              <ModalComment key={`cmt-${item.id}-${index}`} item={childItem} parentItem={item}></ModalComment>
            )
          })}
        </div>
        <Button onClick={loadMore}>Load more</Button>
      </Modal.Footer>

      {loading && <ClipLoader size={100} color={"red"}></ClipLoader>}
      {error && <Alert variant="danger" className='text-center'>{errMessage}</Alert>}
    </Modal>
  )
}

function ModalComment({ item, parentItem}) {
  return (
    <Card className='dn-modal-comment row'>
      <Card.Img className='col-md-2' variant="top" src={item.user.avatar_url} alt="..." />
      <Card.Body className='col-md-10 dn-modal-comment-body'>
        <Card.Title className='text-muted' style={{'fontSize':'13px'}}>
          <span className="text-grey mr-2">{`@${parentItem.user.login}`}</span>
          <span className="text-grey mr-2">
            Last updated: <Moment fromNow>{parentItem.updated_at}</Moment>
          </span>
          <span className="text-grey mr-2">{`Comments: ${parentItem.comments}`}</span>
        </Card.Title>

        <Card.Text>{item.body}</Card.Text>
        <a href={item.url}>Link</a>

      </Card.Body>
    </Card>
  )
}
