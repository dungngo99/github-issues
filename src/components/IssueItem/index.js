import React, { useState } from "react";
import "./style.css";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import IssueModal from '../IssueModal'

export default function IssueItem({ item }) {
  const [show, setShow] = useState(false)

  const hideModal = () => {
    setShow(false)
  }

  const showModal = () => {
    setShow(true)
  }

  return (
    <Card className="dn-issue-item row">
      <Card.Img
        className="col-md-2 dn-issue-img"
        variant="top"
        src={item.user.avatar_url}
        alt="..."
      />
      
      <Card.Body className="col-md-10 dn-issue-body text-left" onClick={showModal}>
        <Card.Title>{`#${item.number} ${item.title}`}</Card.Title>

        <div>
          <div className="text-muted">
            <span className="text-grey mr-2">{`@${item.user.login}`}</span>
            <span className="text-grey mr-2">
              Last updated: <Moment fromNow>{item.updated_at}</Moment>
            </span>
            <span className="text-grey mr-2">{`Comments: ${item.comments}`}</span>
          </div >
          <Card.Text>{item.body.slice(0, 100) + '...'}</Card.Text>
        </div>

        <div className="dn-issue-footer">
          {item.labels.map((label, index) => {
            return (
              <span key={`${index}-${item.id}-footer`} className="badge badge-secondary mr-2">{label.name}</span>
            )
          })}
        </div>
      </Card.Body>

      <IssueModal item={item} show={show} hideModal={hideModal}></IssueModal>
    </Card>
  );
}
