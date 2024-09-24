import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CrearClienteForm from './CrearClienteForm'; // Asegúrate de importar tu componente de formulario

const AgregarClienteModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Agregar Cliente
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CrearClienteForm /> {/* Coloca aquí tu formulario */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AgregarClienteModal;
