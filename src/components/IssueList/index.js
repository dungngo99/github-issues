import React from 'react'
import './style.css'
import IssueItem from '../IssueItem'

export default function IssueList({ issueList }) {
  if (issueList === null) return null

  return (
    <div className='dn-issue-area'>
      {issueList.map((item) => <IssueItem key={item.id} item={item}></IssueItem>)}
    </div>
  )
}