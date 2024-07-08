import React, { useState } from "react"
import { Button, Pagination } from "react-bootstrap"
import { NivelModal } from "../NivelModal"

interface IActionsProps {
  handlePageChange: (page: number) => void
  page: number
  textButton: string
}

export const Actions: React.FC<IActionsProps> = ({ handlePageChange, page, textButton }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NivelModal show={show} handleClose={handleClose} />

      <div className="d-flex justify-content-between mb-2">
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(page > 1 ? page - 1 : 1)} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={() => handlePageChange(page + 1)} />
        </Pagination>

        <div>
          <Button variant="dark" type="button" onClick={handleShow}>
            <i className="bi bi-plus-lg me-2"></i>
            {textButton}
          </Button>
        </div>
      </div>
    </>
  )
}