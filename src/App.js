import React, { useState, useEffect } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "react-bootstrap";
import {ClipLoader} from 'react-spinners'

import IssueList from "./components/IssueList";
import PaginationIssue from "./components/PaginationIssue";
import Search from "./components/Search";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrorMessage] = useState("Something wrong");
  const [searchTerm, setSearchTerm] = useState("facebook/react");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [pageNum, setpageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const [issueList, setIssueList] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let repo = searchTerm.substring(
      searchTerm.lastIndexOf("/") + 1,
      searchTerm.length
    );
    let without_repo = searchTerm.substring(0, searchTerm.lastIndexOf("/"));
    let owner = without_repo.substring(
      without_repo.lastIndexOf("/") + 1,
      without_repo.length
    );

    if (!repo || !owner) {
      setError(true);
      setErrorMessage("Invalid repo or owner name");
    } else {
      setOwner(owner);
      setRepo(repo);
    }
  };

  const setNextPage = () => {
    setpageNum(pageNum+1)
  }

  const setPrevPage = () => {
    setpageNum(pageNum-1)
  }

  const setFirstPage = () => {
    setpageNum(1)
  }

  const setLastPage = () => {
    setpageNum(totalPage)
  }

  useEffect(() => {
    const fetchIssue = async () => {
      if (!repo || !owner) return;

      setLoading(true);
      let url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;

      try {
        let response = await fetch(url);
        let data = await response.json();
        if (response.status === 200) {
          setIssueList(data);
          setTotalPage(data.length)
        } else {
          setError(true);
          setErrorMessage(data.message);
        }
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }

      setLoading(false);
    }

    fetchIssue();
  }, [owner, repo, pageNum]);

  return (
    <div className="App">
      <Container>
        <h1>Github issues</h1>

        <Search
          handleSubmit={handleSubmit}
          searchTerm={searchTerm}
          handleChange={handleChange}
        />

        {error && <Alert variant="danger">{errMessage}</Alert>}

        <PaginationIssue
          setNextPage={setNextPage}
          setPrevPage={setPrevPage}
          setLastPage={setLastPage}
          setFirstPage={setFirstPage}
          pageNum={pageNum}
          totalPage={totalPage}
        ></PaginationIssue>

        {loading && <ClipLoader size={100} color={"red"}></ClipLoader>}

        <IssueList issueList={issueList}></IssueList>
      </Container>
    </div>
  );
}

export default App;
