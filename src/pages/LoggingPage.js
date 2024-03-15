import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LoggingPage() {
  const [errorLogs, setErrorLogs] = useState([]);
  const [infoLogs, setInfoLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const errorLogsResponse = await axios.get(
        "http://localhost:8082/api/v1/logging/ErrorLogs"
      );
      setErrorLogs(errorLogsResponse.data.data);

      const infoLogsResponse = await axios.get(
        "http://localhost:8082/api/v1/logging/InfoLogs"
      );
      setInfoLogs(infoLogsResponse.data.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return (
    <div className="container">
      <h1>Logging Page</h1>
      <div>
        <h2>Error Logs</h2>
        <ul>
          {errorLogs.map((log) => (
            <li key={log.id}>
              <strong>Date:</strong> {log.date}, <strong>Message:</strong>{" "}
              {log.message}, <strong>Description:</strong> {log.description}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Info Logs</h2>
        <ul>
          {infoLogs.map((log) => (
            <li key={log.id}>
              <strong>Date:</strong> {log.date}, <strong>Message:</strong>{" "}
              {log.message}, <strong>Description:</strong> {log.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
