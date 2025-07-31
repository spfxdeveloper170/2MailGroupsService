import { DefaultButton } from "@fluentui/react/lib/Button";
import { FontIcon, mergeStyles } from "office-ui-fabric-react";
import * as React from "react";
import { Col, Modal, Row } from "react-bootstrap";

// need to change sharepoint default class to make it functional component in order for hooks
// to work.

interface IAlertModal {
  showModal: boolean;
  handleShowModal: Function;
  handleCloseModal: Function;
  heading: string;
  message: string;
  style: string;
  section: string;
  icon: string;
}
const iconClass = mergeStyles({
  fontSize: 80,
  height: 80,
  width: 80,
  color: "rgb(73, 130, 5)",
  margin: "0 25px",
});
const iconClassError = mergeStyles({
  fontSize: 80,
  height: 80,
  width: 80,
  color: "rgb(226 11 11)",
  margin: "0 25px",
});
const AlertModal: React.FC<IAlertModal> = (props) => {
  React.useEffect(() => {
    (async () => { })();
  }, []);

  return (
    <Modal
      show={props.showModal}
      onHide={() => {
        props.handleCloseModal(props.section);
      }}
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="updatemodal" style={{ padding: "10px", textAlign: "center" }}>
        <Row className="rowpadding">
          <Col md={12}>
            <FontIcon
              aria-label="Compass"
              iconName={props.icon}
              className={
                props.icon === "SkypeCheck" || props.icon === "SkypeCircleCheck"
                  ? iconClass
                  : iconClassError
              }
            />
          </Col>
          <Col md={12} style={{ marginTop: "10px", marginBottom: "10px" }}>
            <div className={props.style}>{props.message}</div>
          </Col>
        </Row>
        <Row className="buttonsbox rowpadding">
          <DefaultButton
            text="Close"
            onClick={() => {
              props.handleCloseModal(props.section);
            }}
            style={{ marginTop: "10px" }}
          />
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModal;