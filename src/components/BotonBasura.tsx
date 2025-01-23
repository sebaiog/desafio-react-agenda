import { Popconfirm, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const BotonBasura = ({ usuarioId, handleDelete }) => {
  // Eliminar el usuario de la api
  const confirm = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/users/" + usuarioId,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        message.success("Usuario eliminado correctamente");
        // Actualizar la tabla despues de eliminar
        handleDelete(usuarioId);
      } else {
        message.error("Error al eliminar el usuario");
      }
    } catch (error) {
      message.error("Error al eliminar el usuario");
    }
  };

  return (
    <Popconfirm
      title="¿Está seguro de eliminar este usuario?"
      onConfirm={confirm}
    >
      <Button>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default BotonBasura;
