import { Drawer, Form, Input, Button, message } from "antd";
import { Space } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AgregarUsuario = ({ visible, onOk, onCancel, refetch }) => {
  const [form] = Form.useForm();

  // Agregar el usuario a la api
  const submitData = async () => {
    let values;
    try {
      values = await form.validateFields();
    } catch (error) {
      message.warning("Todos los campos son requeridos");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Usuario agregado correctamente");
        // LLamar a la api para rescatar los nuevos usuarios
        await refetch();
        // Cerrar el drawer
        onOk();
      } else {
        message.error("Error al agregar el usuario");
      }
    } catch (error) {
      message.error("Error al agregar el usuario");
    }
  };

  return (
    <section>
      <Drawer
        title="Agregar nuevo Contacto"
        placement="right"
        closable={true}
        onClose={onCancel}
        visible={visible}
        width={500}
        extra={
          <Space>
            <Button onClick={onCancel}>Cancelar</Button>
            <Button type="primary" htmlType="submit" onClick={submitData}>
              Guardar
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          {...layout}
          name="agregarUsuarioForm"
          initialValues={{}}
        >
          <Form.Item
            label="URL imagen de Perfil"
            name="photo"
            rules={[{ required: true, message: "Por favor inserta una URL!" }]}
            labelCol={{ span: 24 }} // Set label to take full width
            wrapperCol={{ span: 24 }} // Set input to take full width
          >
            <Input placeholder="Inserte la URL de la imagen de perfil" />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              { required: true, message: "Por favor inserta un nombre!" },
            ]}
            labelCol={{ span: 24 }} // Set label to take full width
            wrapperCol={{ span: 24 }} // Set input to take full width
          >
            <Input placeholder="Escriba el nombre del contacto" />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="description"
            rules={[
              {
                required: true,
                message: "Por favor inserta una descripción!",
              },
            ]}
            labelCol={{ span: 24 }} // Set label to take full width
            wrapperCol={{ span: 24 }} // Set input to take full width
          >
            <Input.TextArea placeholder="Agregue la descripción del contacto" />
          </Form.Item>
        </Form>
      </Drawer>
    </section>
  );
};

export default AgregarUsuario;
