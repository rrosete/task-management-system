import Layout from "@/hoc/Layout";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Modal, TextInput } from "flowbite-react";
import { Table } from "@/components/table/table";

const Task: NextPage = () => {
  const header = ["Date", "Task", "Status", "Actions"];

  const [tasks, setTasks] = useState([
    {
      id: 0,
      createdAt: "10-12-2023",
      task: "Sample Task",
      status: "Todo",
    },
  ]);
  const [idIncrement, setIdIncrement] = useState(1);
  const [addTask, setAddTask] = useState("");
  const [editTask, setEditTask] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    const itemToEdit = tasks.find((item) => item.id === id);
    if (itemToEdit) {
      setEditTask(itemToEdit.task);
    }
  };
  const onEdit = () => {
    const updatedData = tasks.map((item) =>
      item.id === taskId ? { ...item, task: editTask } : item
    );
    setTasks(updatedData);
  };

  const handleDelete = (id: number) => {
    const updatedData = tasks.filter((item) => item.id !== id);
    setTasks(updatedData);
  };

  const handleStatus = (id: number, status: string) => {
    let updateStatus = "";

    if (status === "Todo") {
      updateStatus = "In Progress";
    } else if (status === "In Progress") {
      updateStatus = "Complete";
    } else {
      updateStatus = "Completed";
    }

    const updatedData = tasks.map((item) =>
      item.id === id ? { ...item, status: updateStatus } : item
    );

    setTasks(updatedData);
  };

  const handleCreate = () => {
    const newTask = {
      id: idIncrement,
      createdAt: moment().format("MM-DD-YYYY"),
      task: addTask,
      status: "Todo",
    };
    setTasks([...tasks, newTask]);
    setIdIncrement(idIncrement + 1);
  };

  const renderData = tasks.map((item) => {
    let status = "";

    if (item.status === "Todo") {
      status = "Progress";
    } else if (item.status === "In Progress") {
      status = "Complete";
    } else {
      status = "Completed";
    }

    return {
      createdAt: item.createdAt,
      task: item.task,
      status: item.status,
      actions: (
        <div className="flex flex-row gap-2">
          <button
            onClick={() => {
              setEditModal(true);
              handleEdit(item.id);
              setTaskId(item.id);
            }}
          >
            Edit
          </button>
          <button onClick={() => handleStatus(item.id, item.status)}>
            {status}
          </button>
          <button onClick={() => handleDelete(item.id)}>delete</button>
        </div>
      ),
    };
  });

  return (
    <Layout>
      <div className="flex-col mb-24 w-full">
        <div className="flex flex-row justify-between mb-16">
          <div className="flex flex-row gap-10">
            <TextInput
              placeholder="Search..."
              value=""
              onChange={(e) => {}}
              name="search"
            />
            <div className="w-36">
              <Button onClick={() => {}}>sort</Button>
            </div>
          </div>
          <div className="w-36">
            <Button
              onClick={() => {
                setAddModal(true);
                setAddTask("");
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <Table header={header} data={renderData} />
      </div>
      {/* create */}
      <Modal show={addModal} onClose={() => setAddModal(false)}>
        <Modal.Header>Add Task</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form>
              <div className="flex flex-col">
                <TextInput
                  name="task"
                  placeholder="Task..."
                  value={addTask}
                  onChange={(e) => {
                    setAddTask(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            onClick={() => {
              handleCreate();
              setAddModal(false);
            }}
          >
            Save
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setAddModal(false);
              setAddTask("");
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit */}

      <Modal show={editModal} onClose={() => setAddModal(false)}>
        <Modal.Header>Edit Task</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form>
              <div className="flex flex-col">
                <TextInput
                  name="task"
                  placeholder="Task..."
                  value={editTask}
                  onChange={(e) => {
                    setEditTask(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            onClick={() => {
              onEdit();
              setEditModal(false);
            }}
          >
            Update
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setEditModal(false);
              setEditTask("");
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Task;
