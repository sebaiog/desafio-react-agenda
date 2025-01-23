import ListaUsuarios from "./ListaUsuarios";
import { Button } from "antd";
import { useState } from "react";
import AgregarUsuario from "./AgregarUsuario";
import { PlusOutlined } from "@ant-design/icons";
import useFetch from "./Services"; // Import the custom hook

const Home = (): JSX.Element => {
  const [visible, setVisible] = useState(false);

  // Obtener la lista de usuarios
  const {
    data: users,
    isPending,
    error,
    refetch,
  } = useFetch("http://localhost:9000/api/users");

  // Mostrar el drawer
  const showDrawer = () => {
    setVisible(true);
  };

  // Ocultar el drawer
  const handleOk = () => {
    setVisible(false);
  };

  // Ocultar el drawer
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <section style={{ marginLeft: 50, marginRight: 50 }}>
      {error && <p>{error}</p>}
      <h1 style={{ marginBottom: 0 }}>
        Agenda Previred - Mi agenda de contactos laboral
      </h1>
      <p style={{ marginTop: 0 }}>
        Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar
        nuevos contactos y eliminar contactos no deseados
      </p>

      <Button type="primary" onClick={showDrawer} style={{ marginBottom: 16 }}>
        <PlusOutlined /> Agregar Contacto
      </Button>
      {visible && (
        <AgregarUsuario
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          refetch={refetch}
        />
      )}
      {isPending && <p>Loading users...</p>}
      {users && <ListaUsuarios usuariosIn={users} />}
    </section>
  );
};

export default Home;
