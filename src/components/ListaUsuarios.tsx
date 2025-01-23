import React, { useEffect, useState } from "react";
import BotonBasura from "./BotonBasura";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Button, Table, Space } from "antd";

interface User {
  id: number;
  name: string;
  description: string;
  photo: string;
}

interface ListaUsuariosProps {
  usuariosIn: User[];
}

const ListaUsuarios: React.FC<ListaUsuariosProps> = ({ usuariosIn }) => {
  const [usuarios, setUsuarios] = useState(usuariosIn);
  const [searchText, setSearchText] = useState("");

  // Actualiza la tabla
  useEffect(() => {
    setUsuarios([...usuariosIn]);
  }, [usuariosIn]);

  // Elimina los usuarios de la tabla
  const handleDelete = (usuarioId: number) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== usuarioId));
  };

  // Buscar los usuarios en la busqueda
  const handleSearch = () => {
    if (searchText.length == 0) {
      setUsuarios([...usuariosIn]);
    } else {
      const filtrarUsuarios = usuariosIn.filter((usuario) =>
        usuario.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setUsuarios(filtrarUsuarios);
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space size="middle">
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Acciones",
      key: "action",
      render: (record: { id: any }) => (
        <Space size="middle">
          <BotonBasura usuarioId={record.id} handleDelete={handleDelete} />
        </Space>
      ),
    },
  ];

  return (
    <section>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
        <Input
          placeholder="Buscar..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SearchOutlined />}
          onClick={handleSearch}
          style={{ marginLeft: 8 }}
        />
      </div>
      <Table dataSource={usuarios} columns={columns} rowKey="id" />
    </section>
  );
};

export default ListaUsuarios;
