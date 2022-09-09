import "antd/dist/antd.min.css";
import "./App.css";
import { Button, Table , Modal , Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [editingInput, seteditingInput] = useState(null)
  const [isEditing, setisEditing] = useState(false)
  let [datasource, setDataSource] = useState([
    {
      id: 1,
      name: "ahmed",
      email: "gemyisking@gmail.com",
      address: "15 may city",
    },
    {
      id: 2,
      name: "gamal",
      email: "gemyiskingg@gmail.com",
      address: "15 may cityy",
    },
    {
      id: 3,
      name: "kamal",
      email: "gemyiskinggg@gmail.com",
      address: "15 may cityyy",
    },
    {
      id: 4,
      name: "mohamed",
      email: "gemyiskingggg@gmail.com",
      address: "15 may cityyyy",
    },
  ]);
  let columns = [
    { key: "1", title: "ID", dataIndex: "id" },
    { key: "2", title: "Name", dataIndex: "name" },
    { key: "3", title: "Email", dataIndex: "email" },
    { key: "4", title: "Address", dataIndex: "address" },
    {
      key: "4",
      title: "Action",
      render: (record) => {
        return <>
          <EditOutlined onClick={() => {
            onEditStudent(record)
          }}/>
          <DeleteOutlined onClick={() => {DeletStudent(record)}} style={{color: "red" , marginLeft: 12}}/>
        </>
      }
    },
  ];

  let onAddStudent = () => {
    let Random = parseInt(Math.random() * 1000);
    let newStudent = {
      id: Random,
      name: "mohamed" + Random,
      email: Random + "gemyiskingggg@gmail.com",
      address: "15 may cityyyy" + Random,
    };
    // setDataSource([...datasource, newStudent]);
    setDataSource(pre => {
      return [...pre , newStudent]
    })
  };

  let DeletStudent = (record) => {
    Modal.confirm({
      title: "Are you sure to Delete this Item",
      okText: "yes",
      okType: "danger",
      onOk: () => {
        setDataSource(pre => {
          return pre.filter(student => student.id !== record.id)
         })
      }
    })
  }

  let onEditStudent = (record) => {
    setisEditing(true)
    seteditingInput({ ...record })
  }
  let resetEdtiting = () => {
    setisEditing(false)
    seteditingInput(null)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}> Add a New Student </Button>
        {/* {datasource.map(data => <div key={data.id}> {data.name} </div>)} */}
        <Table columns={columns} dataSource={datasource}></Table>
        <Modal
          title="Edit Student"
          open={isEditing}
          onCancel={() => {
            resetEdtiting()
          }}
          onOk={() => {
            setDataSource(pre => {
              return pre.map(student => {
                if (student.id === editingInput.id) {
                  return editingInput
                } else {
                  return student
                }
              })
            })
            resetEdtiting()
          }}
        >
          <Input value={editingInput?.name} onChange={(e) => {
            seteditingInput(pre => {
              return {...pre , name:e.target.value}
            })
          }} />
          <Input value={editingInput?.email} onChange={(e) => {
            seteditingInput(pre => {
              return {...pre , email:e.target.value}
            })
          }}/>
          <Input value={editingInput?.address} onChange={(e) => {
            seteditingInput(pre => {
              return {...pre , address:e.target.value}
            })
          }}/>
        </Modal>
      </header>
    </div>
  );
}

export default App;
