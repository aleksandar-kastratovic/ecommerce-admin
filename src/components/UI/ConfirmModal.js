import { Modal } from "react-bootstrap";

const ConfirmModal = ({confirm, confirmWhat }) => {


    return (
        <Modal
            show={!!confirmWhat}
            onHide={() => confirm(null)}
            backdrop="static"
            keyboard={false}
            centered
            size="sm"
            scrollable={true}
            className="add-role-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Potvrdite</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12">
                        <p className="modal-text">{confirmWhat && confirmWhat[0]}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn-control cancel-btn" onClick={() => confirm(null)}>Odustanite</button>
                <button
                    type="button"
                    className="btn-control save-btn"
                    onClick={() => {confirmWhat && confirmWhat[1](); confirm(null);}}
                >Potvrdite</button>
            </Modal.Footer>
        </Modal>
    );
}
  
export default ConfirmModal;