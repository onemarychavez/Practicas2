import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from 'react-bootstrap';
import { obtenerDirecciones } from "./Direcciones"; // para API de direcciones
import { obtenerClientes } from "./Clientes"; // para API de clientes
import AgregarClienteModal from "./CrearClienteForm"; // Importa tu componente de agregar cliente

const MostrarClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [direcciones, setDirecciones] = useState([]);
    const [loadingDirecciones, setLoadingDirecciones] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAgregarModal, setShowAgregarModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerClientes();
                setClientes(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const verDirecciones = async (id_cliente) => {
        setLoadingDirecciones(true);
        setError(null);
        try {
            const data = await obtenerDirecciones(id_cliente);
            setDirecciones(data);
            setShowModal(true); // Muestra el modal de direcciones
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingDirecciones(false);
        }
    };

    const close = () => setShowModal(false);
    const closeAgregarModal = () => setShowAgregarModal(false);
    const handleShowAgregarModal = () => setShowAgregarModal(true); // Muestra el modal para agregar cliente

    if (loading) return <p>Cargando......</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <div className="text-end">
                <Button variant="primary" onClick={handleShowAgregarModal}>Agregar Cliente</Button>{' '}
            </div>
    
            <Table responsive border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DUI</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>ACCION</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id_cliente}>
                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.dui}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.correo}</td>
                            <td>
                                <Button variant="success"><i className="bi bi-pencil-square"></i></Button>{' '}
                                <Button variant="warning" onClick={() => verDirecciones(cliente.id_cliente)}>Ver Direcciones</Button>{' '}
                                <Button variant="danger"><i className="bi bi-trash3-fill"></i></Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para ver direcciones */}
            <Modal show={showModal} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Direcciones del Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingDirecciones ? (
                        <p>Cargando direcciones...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Dirección</th>
                                    <th>ID Cliente</th>
                                    <th>Dirección</th>
                                </tr>
                            </thead>
                            <tbody>
                                {direcciones.map((direccion) => (
                                    <tr key={direccion.id_direccion}>
                                        <td>{direccion.id_direccion}</td>
                                        <td>{direccion.id_cliente}</td>
                                        <td>{direccion.direccion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para agregar cliente */}
            <Modal show={showAgregarModal} onHide={closeAgregarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgregarClienteModal /> {/* Componente del formulario para agregar cliente */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeAgregarModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={closeAgregarModal}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MostrarClientes;
