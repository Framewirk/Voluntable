import React from "react";
import { useEffect } from "react";
import { Container, Row, Col, Table, Modal } from "react-bootstrap";

import { AppNavbar } from "../components/AppNavbar";

import { Icon } from "@iconify/react";

import { APIinstance } from "../instances/axios";
import { ENDPOINTS } from "../utils/constants";

const TaskPage = () => {
  const [tasks, setTasks] = React.useState([]);

  const [sharemodal, setShareModal] = React.useState(false);
  const [sharelink, setShareLink] = React.useState("");

  const style = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "5px 5px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  };

  useEffect(() => {
    function fetchMyTasks() {
      APIinstance.get(ENDPOINTS.getMyTasks).then((response) => {
        setTasks(response.data.tasks);
        console.log(response.data.tasks);
      });
    }
    fetchMyTasks();
  }, []);

  return (
    <>
      <AppNavbar />
      <Container>
        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Col xs={12}>
            <h1>My Tasks</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{ overflowX: "scroll" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Task Description</th>
                  <th>Links</th>
                  <th>Task Author</th>
                  <th>Participation Certificate ID</th>
                  <th>Participation Certificate</th>
                  <th>Completion Status</th>
                  <th>Completion Certificate ID</th>
                  <th>Completion Certificate</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                      {task.files.map((file) => {
                        return (
                          <a
                            href={file}
                            target="_blank"
                            style={{ marginRight: "10px" }}
                          >
                            {file}
                          </a>
                        );
                      })}
                    </td>
                    <td>
                      {task.author.fullName} -{" "}
                      <a href={`mailto:${task.author.email}`}>
                        {task.author.email}
                      </a>
                    </td>
                    <td>
                      {task.participation[0].certificateId ||
                        "Generation In Progress"}
                    </td>
                    <td>
                      {task.participation ? (
                        <a href={task.participation[0].link}>
                          View Certificate
                        </a>
                      ) : (
                        "Generation In Progress"
                      )}
                    </td>
                    <td>{task.taskStatus}</td>
                    <td>
                      {task.completion
                        ? task.completion[0].certificateId
                        : "Not Issued"}
                    </td>
                    <td>
                      {task.completion ? (
                        <a href={task.completion[0].link}>View Certificate</a>
                      ) : (
                        "Not Issued"
                      )}
                    </td>
                    <td>
                      <button
                        style={style}
                        onClick={() => {
                          setShareLink(
                            task.completion
                              ? task.completion[0].link
                              : task.participation[0].link
                          );
                          setShareModal(true);
                        }}
                      >
                        Share
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Modal
          show={sharemodal}
          onHide={() => {
            setShareModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Share</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/shareArticle?mini=true&url=https://onedelhi.voluntable.com&title=Voluntable%20Certificate&summary=${sharelink}`
                )
              }
            >
              LinkedIn{" "}
              <Icon
                icon="akar-icons:linkedin-box-fill"
                style={{ fontSize: "40px" }}
              />
            </button>
            <button>
              Facebook{" "}
              <Icon
                icon="brandico:facebook-rect"
                style={{ fontSize: "35px" }}
              />
            </button>
            <button>
              Twitter{" "}
              <Icon icon="fa:twitter-square" style={{ fontSize: "38px" }} />
            </button>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default TaskPage;
