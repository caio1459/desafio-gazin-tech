import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Loading } from "../Loading";
import { CustomToast } from "../CustomToast";
import { IDesenvolvedor } from "../../interfaces/IDesenvolvedor";
import { useDevs } from "../../hooks/useDevs";
import { useNiveis } from "../../hooks/useNiveis";

interface IDevModalProps {
  show: boolean;
  handleClose: () => void;
  devToEdit?: IDesenvolvedor | null;
}

export const DevModal: React.FC<IDevModalProps> = ({
  handleClose,
  show,
  devToEdit,
}) => {
  const {
    nome,
    setNome,
    hobby,
    setHobby,
    sexo,
    setSexo,
    dataNascimento,
    setDataNascimento,
    nivelId,
    setNivelId,
    errorMessages,
    toast,
    loading,
    handleSave
  } = useDevs();

  const { allNiveis } = useNiveis();

  useEffect(() => {
    if (devToEdit) {
      setNome(devToEdit.nome);
      setHobby(devToEdit.hobby);
      setSexo(devToEdit.sexo);
      setDataNascimento(devToEdit.data_nascimento);
      setNivelId(devToEdit.nivel?.id.toString() || "");
    }
  }, [devToEdit, setNome, setHobby, setSexo, setDataNascimento, setNivelId]);

  const handleNivelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNivelId(e.target.value);
  };

  return (
    <>
      {errorMessages.length > 0 &&
        errorMessages.map((msg, i) => (
          <CustomToast
            key={i}
            visible={toast}
            title={
              devToEdit ? "Erro ao editar desenvolvedor" : "Erro ao cadastrar desenvolvedor"
            }
            text={msg}
          />
        ))}
      <Loading loading={loading} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {devToEdit ? "Editar Desenvolvedor" : "Cadastrar Desenvolvedor"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="devNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do desenvolvedor"
                autoFocus
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="devHobby">
              <Form.Label>Hobby</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hobby do desenvolvedor"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="devSexo">
              <Form.Label>Sexo</Form.Label>
              <Form.Select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
              >
                <option value="">Selecione o sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="devDataNascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="devNivelId">
              <Form.Label>Nível</Form.Label>
              <Form.Select
                value={nivelId}
                onChange={handleNivelChange}
              >
                <option value="">Selecione um nível</option>
                {allNiveis?.data.map((nivel) => (
                  <option key={nivel.id} value={nivel.id}>
                    {nivel.nivel}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleSave(devToEdit, handleClose)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
