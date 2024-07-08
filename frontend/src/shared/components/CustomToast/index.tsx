import React, { useState, useEffect } from "react"
import { Row, Col, Toast, ToastContainer } from "react-bootstrap"

interface ICustomToastProps {
  visible: boolean
  title: string
  text: string
}

export const CustomToast: React.FC<ICustomToastProps> = ({ visible, title, text }) => {
  const [show, setShow] = useState(visible);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (visible) {
      setShow(true);
      const now = new Date();
      const formattedDate = now.toLocaleString("default", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setDate(formattedDate);
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position="top-end" className="mt-5 me-2">
          <Toast show={show} onClose={() => setShow(false)} delay={4000} autohide>
            <Toast.Header>
              <strong className="me-auto">{title}</strong>
              <small>{date}</small>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  )
}
