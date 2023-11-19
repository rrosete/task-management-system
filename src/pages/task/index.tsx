import Layout from "@/hoc/Layout";
import { NextPage } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import { Button, Modal, TextInput } from "flowbite-react";
import { Table } from "@/components/table/table";
import { IData } from "@/interface/pages/task";
import { MdOutlineAdd } from "react-icons/md";

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
  const [sorting, setSortning] = useState<boolean>(false);

  const [filteredItems, setFilteredItems] = useState<IData[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const results = tasks.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredItems(results);
  }, [searchTerm, tasks]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  const handleSortByDate = () => {
    const sorted = [...tasks].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return sorting
        ? dateA.getTime() - dateB.getTime() // Ascending order
        : dateB.getTime() - dateA.getTime(); // Descending order
    });
    setFilteredItems(sorted);
  };

  useEffect(() => {
    handleSortByDate();
    // eslint-disable-next-line
  }, [sorting]);

  const renderData = filteredItems.map((item) => {
    let status = "";

    if (item.status === "Todo") {
      status = "Progress";
    } else if (item.status === "In Progress") {
      status = "Complete";
    } else {
      status = "Completed";
    }

    return {
      id: item.id,
      createdAt: item.createdAt,
      task: item.task,
      status: item.status,
      actions: (
        <div className="flex flex-row gap-2">
          <button
            className="underline hover:text-teal-600"
            onClick={() => {
              setEditModal(true);
              handleEdit(item.id);
              setTaskId(item.id);
            }}
          >
            Edit
          </button>
          <button
            className="underline hover:text-teal-600 disabled:opacity-40 disabled:hover:text-gray-400"
            onClick={() => handleStatus(item.id, item.status)}
            disabled={status === "Completed" ? true : false}
          >
            {status}
          </button>
          <button
            className="underline hover:text-teal-600"
            onClick={() => handleDelete(item.id)}
          >
            delete
          </button>
        </div>
      ),
    };
  });

  return (
    <Layout>
      <div className="flex-col mb-24 w-full">
        <div className="flex flex-col lg:flex-row justify-between mb-10">
          <div className="flex flex-col w-full lg:flex-row lg:gap-5 md:w-2/4 items-center">
            <TextInput
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              name="search"
              className="w-1/2"
            />
            <a
              className="cursor-pointer underline"
              onClick={() => {
                setSortning(!sorting);
              }}
            >
              sort by date
            </a>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <Button
              onClick={() => {
                setAddModal(true);
                setAddTask("");
              }}
            >
              <MdOutlineAdd /> Add Task
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
