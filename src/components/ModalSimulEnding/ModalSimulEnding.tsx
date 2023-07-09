import { Button, Modal } from "react-bootstrap";
import "./ModalSimulEnding.css"
import { formaterTime, getTunerValue } from "../../utils/fnGenerics";
import { GeneralConfig } from "../../utils/types";

type ModalProps = {
    collapsed: boolean,
    show: boolean,
    handleCloseModal: () => void,
    simulSeconds: number,
    generalConfig: GeneralConfig
};
type TimerItem = {
    key: string;
    value: string;
};

function ModalSimulEnding({ collapsed, show, handleCloseModal, simulSeconds, generalConfig }: ModalProps) {

    const getTimes = () => {
        const a: TimerItem = {
          key: "dd",
          value: formaterTime(Math.floor(
                  (simulSeconds * getTunerValue(generalConfig.tunerTime)) / (3600 * 24)
                )
          ),
        };
        const b: TimerItem = {
          key: "hh",
          value: formaterTime(Math.floor(
                  (simulSeconds * getTunerValue(generalConfig.tunerTime)) / 3600
                ) % 24
          ),
        };
        const c: TimerItem = {
          key: "mm",
          value: formaterTime(Math.floor(
                  (simulSeconds * getTunerValue(generalConfig.tunerTime)) / 60
                ) % 60
          ),
        };
        const d: TimerItem = {
          key: "ss",
          value: formaterTime(Math.floor(
                  (simulSeconds * getTunerValue(generalConfig.tunerTime))
                ) % 60
          ),
        };
        return [a, b, c, d];
      };
  
    return (
        <Modal show={show} onHide={handleCloseModal} className={`ModalSimulEnding ${collapsed? 'collapsed': 'success'}`}>
            <Modal.Header closeButton>
                <Modal.Title>{collapsed? "Colapso!": "Simulación Finalizada!"}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color: "black"}}>
                <span style={{fontSize: "18px"}}>Se han simulado: </span>
                
                <div className="ModalSimulEnding_timer">
                    {
                        getTimes().map((item, index) => (
                            <span key={index}> {index===0? '': '-'} {item.value} <strong>{item.key}</strong></span>
                        ))
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseModal} className="ModalSimulEnding_button">
                    Ver Mapa
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

  export default ModalSimulEnding;
  