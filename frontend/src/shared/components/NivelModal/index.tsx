import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Loading } from "../Loading";
import { CustomToast } from "../CustomToast";
import { INivel } from "../../interfaces/INivel";
import { useNiveis } from "../../hooks/useNiveis";

interface INivelModalProps {
  show: boolean;
  handleClose: () => void;
  nivelToEdit?: INivel | null;
}

export const NivelModal: React.FC<INivelModalProps> = ({ handleClose, show, nivelToEdit }) => {
  const { nivel, setNivel, loading, errorMessages, toast, handleSave } = useNiveis();

  useEffect(() => {
    if (nivelToEdit) {
      setNivel(nivelToEdit.nivel);
    }
  }, [nivelToEdit, setNivel]);

  return (
    <>
      {errorMessages.length > 0 &&
        errorMessages.map((msg, i) => (
          <CustomToast
            key={i}
            visible={toast}
            title={nivelToEdit ? "Erro ao editar nível" : "Erro ao cadastrar nível"}
            text={msg}
          />
        ))}
      <Loading loading={loading} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {nivelToEdit ? "Editar Nível" : "Cadastrar Nível"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nivelID">
              <Form.Label>Nível</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do nível"
                autoFocus
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleSave(nivelToEdit, handleClose)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
