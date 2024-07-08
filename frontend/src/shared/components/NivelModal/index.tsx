import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import NivelService from "../../services/niveis/NivelService";
import { Loading } from "../Loading";
import { ErroException } from "../../services/api/ErrorException";
import { CustomToast } from "../CustomToast";
import { INivel } from "../../interfaces/INivel";

interface INivelModalProps {
  show: boolean;
  handleClose: () => void;
  nivelToEdit?: INivel | null;
}

export const NivelModal: React.FC<INivelModalProps> = ({ handleClose, show, nivelToEdit }) => {
  const queryClient = useQueryClient();
  const [nivel, setNivel] = useState(nivelToEdit ? nivelToEdit.nivel : "");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (nivelToEdit) {
      setNivel(nivelToEdit.nivel);
    }
  }, [nivelToEdit]);

  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      let response;
      if (nivelToEdit) {
        response = await NivelService.updateNivel({ nivel, id: nivelToEdit.id }, nivelToEdit.id);
      } else {
        response = await NivelService.createNivel({ nivel });
      }
      setLoading(false);
      return response;
    },
    onSuccess: (data) => {
      if (data instanceof ErroException) {
        setToast(true)
        const errorResponse = data;
        if (errorResponse.errors) {
          const errors = Object.values(errorResponse.errors).flat();
          setErrorMessages(errors);
        } else {
          setErrorMessages([errorResponse.message]);
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ["niveis"] });
        setNivel("");
        handleClose();
      }
    },
  });

  const handleSave = () => {
    setErrorMessages([]);
    setToast(false)
    mutation.mutate();
  };

  return (
    <>
      {
        errorMessages.length > 0 && (
          errorMessages.map((msg, i) => (
            <CustomToast
              key={i}
              visible={toast}
              title={nivelToEdit ? "Erro ao editar nivel" : "Erro ao cadastrar nivel"}
              text={msg} />
          ))
        )
      }
      <Loading loading={loading} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{nivelToEdit ? "Editar Nível" : "Cadastrar Nível"}</Modal.Title>
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
                onChange={e => setNivel(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
