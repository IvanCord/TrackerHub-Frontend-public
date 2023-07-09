import { Button, Modal } from "react-bootstrap";
import "./ModalBreakdowns.css";
import { useEffect, useState } from "react";
import { addNewBreakdown } from "../../api/tracking";
import { Breakdown } from "../../utils/types";

type ModalProps = {
  show: boolean;
  handleClose: () => void;
  id: string;
};

function ModalBreakdowns({ show, handleClose, id }: ModalProps) {
  const [selectIncidencia, setSelectIncidencia] = useState(0);
  const [breakdown, setBreakdown] = useState<Breakdown>({
    vehicleId: "",
    type: 0,
  });

  useEffect(() => {
    setSelectIncidencia(0);
    setBreakdown({ ...breakdown, vehicleId: id });
  }, [id]);

  const handleSend = async (e: { preventDefault: () => void }) => {
    const aux = await addNewBreakdown(breakdown);
    setBreakdown({
      vehicleId: "",
      type: 0,
    });
    handleClose();
  };

  return (
    <Modal show={show} className={`ModalBreakdowns`}>
      <Modal.Header closeButton onClick={() => handleClose()}>
        <Modal.Title>
          Provocar incidente en <strong>{id}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ModalBreakdowns_SelectType">
          <div
            className={`mbd-st-button simple ${
              selectIncidencia == 1 && "selected"
            }`}
            onClick={() => {
              setBreakdown({ ...breakdown, type: 1 });
              setSelectIncidencia(1);
            }}
          >
            <i className="bi bi-circle-fill"></i>
            <span>Simple</span>
          </div>
          <div
            className={`mbd-st-button medio ${
              selectIncidencia == 2 && "selected"
            }`}
            onClick={() => {
              setBreakdown({ ...breakdown, type: 2 });
              setSelectIncidencia(2);
            }}
          >
            <i className="bi bi-circle-fill"></i>
            <span>Medio</span>
          </div>
          <div
            className={`mbd-st-button grave ${
              selectIncidencia == 3 && "selected"
            }`}
            onClick={() => {
              setBreakdown({ ...breakdown, type: 3 });
              setSelectIncidencia(3);
            }}
          >
            <i className="bi bi-circle-fill"></i>
            <span>Grave</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secundary"
          onClick={() => handleClose()}
          className="ModalBreakdowns_close"
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSend}
          className="ModalBreakdowns_primary"
        >
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBreakdowns;
