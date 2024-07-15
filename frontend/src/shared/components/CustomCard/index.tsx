import React from "react";
import { Card } from "react-bootstrap";

interface ICustomCardProps {
  title: string;
  text: string;
}

export const CustomCard: React.FC<ICustomCardProps> = ({ text, title }) => {
  return (
    <Card className="mb-3 shadow-sm border-1">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="text-primary">{title}</Card.Title>
          <i className="bi bi-info-circle-fill text-info fs-4"></i>
        </div>
        <Card.Text className="fs-5">
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
