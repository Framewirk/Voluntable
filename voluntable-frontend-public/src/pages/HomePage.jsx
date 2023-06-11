import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import moment from "moment";
import { APIinstance } from "../instances/axios";
import { ENDPOINTS } from "../utils/constants";
import { Container, Row, Col } from "react-bootstrap";

import { AppNavbar } from "../components/AppNavbar";
import LoadingOverlay from "react-loading-overlay";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const alert = useAlert();

  const [selectedTask, setSelectedTask] = useState(0);
  const [loading, setLoading] = useState(false);

  const onReject = async () => {
    let response = await APIinstance.patch(ENDPOINTS.rejectTask, {
      _id: tasks[selectedTask]._id,
    });
    if (response.status === 200) {
      alert.info("Task Rejected");
      setSelectedTask((prev) => prev + 1);
    }
  };

  const onAccept = async () => {
    let response = await APIinstance.patch(ENDPOINTS.acceptTask, {
      _id: tasks[selectedTask]._id,
    });
    if (response.status === 200) {
      alert.success("Task Accepted");
      setSelectedTask((prev) => prev + 1);
    }
  };

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      let response = await APIinstance.get(ENDPOINTS.getTasks);
      if (response.status === 200) {
        setTasks(response.data.tasks);
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);
  return (
    <LoadingOverlay active={loading} spinner text="Loading..." fadeSpeed={10} >
      <AppNavbar />
      {tasks ? (
        <Container style={{ marginTop: "5%" }}>
          {selectedTask < tasks.length ? (
            <>
              <Row style={{ justifyContent: "center" }}>
                {tasks.length > 0 ? (
                  <Col
                    xs={12}
                    style={{
                      backgroundColor: "#eeeeee",
                      padding: "20px",
                      borderRadius: "10px",
                      textAlign: "center",
                      maxWidth: "600px",
                    }}
                  >
                    <div style={{ fontSize: 30, textAlign: "center" }}>
                      Task Name : {tasks[selectedTask].name}
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        wordBreak: "break-word",
                        backgroundColor: "#e0e3f3",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      Description : {tasks[selectedTask].description}
                    </div>
                    <div
                      style={{ textAlign: "center", wordBreak: "break-word" }}
                    >
                      Attached Files :
                      <div>
                        {tasks[selectedTask].files.map((file, index) => (
                          <>
                            <a href={file} target="_blank" rel="noreferrer">
                              {file}
                            </a>
                            <br />
                          </>
                        ))}
                      </div>
                    </div>
                    Start Date :{" "}
                    {moment(tasks[selectedTask].startDate).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )}
                    <br />
                    End Date :{" "}
                    {moment(tasks[selectedTask].endDate).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )}
                    <br />
                    Estimated Time (in Hours) :{" "}
                    {tasks[selectedTask].effortHours}
                    <br />
                    <div
                      style={{
                        textAlign: "center",
                        wordBreak: "break-word",
                        backgroundColor: "#e0e3f3",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <div style={{ fontSize: 24 }}>Author Details :</div>
                      Name : {tasks[selectedTask].author.fullName}
                      <br />
                      Email : {tasks[selectedTask].author.email}
                      <br />
                    </div>
                  </Col>
                ) : null}
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <Col xs={6} md={3} lg={2} style={{ textAlign: "center" }}>
                  <button
                    style={{
                      margin: "10%",
                      color: "#ff5252",
                      backgroundColor:
                        selectedTask >= tasks.length
                          ? "#919191"
                          : "transparent",
                      border: "#ff5252 1px solid",
                    }}
                    disabled={selectedTask >= tasks.length}
                    onClick={() => onReject()}
                  >
                    Reject
                  </button>
                </Col>
                <Col xs={6} md={3} lg={2} style={{ textAlign: "center" }}>
                  <button
                    style={{
                      margin: "10%",
                      color: "#4CAF50",
                      backgroundColor:
                        selectedTask >= tasks.length
                          ? "#919191"
                          : "transparent",
                      border: "#4CAF50 1px solid",
                    }}
                    disabled={selectedTask >= tasks.length}
                    onClick={() => onAccept()}
                  >
                    Accept
                  </button>
                </Col>
              </Row>

              <Row style={{ justifyContent: "center", display: "none" }}>
                <Col xs={6} md={3} lg={2} style={{ textAlign: "center" }}>
                  <button
                    style={{
                      margin: "10%",
                      color: "#919191",
                      backgroundColor:
                        selectedTask === 0 ? "#d9d9d9" : "transparent",
                      border: "#919191 1px solid",
                      width: "90%",
                      maxWidth: "150px",
                    }}
                    disabled={selectedTask === 0}
                    onClick={() => setSelectedTask((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                </Col>
                <Col xs={6} md={3} lg={2} style={{ textAlign: "center" }}>
                  <button
                    style={{
                      margin: "10%",
                      color: "#919191",
                      backgroundColor:
                        selectedTask === tasks.length - 1
                          ? "#d9d9d9"
                          : "transparent",
                      border: "#919191 1px solid",
                      width: "90%",
                      maxWidth: "150px",
                    }}
                    disabled={selectedTask === tasks.length - 1}
                    onClick={() => setSelectedTask((next) => next + 1)}
                  >
                    Next
                  </button>
                </Col>
              </Row>
            </>
          ) : (
            <div>No Tasks Available</div>
          )}
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </LoadingOverlay>
  );
};

export default HomePage;
