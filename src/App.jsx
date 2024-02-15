import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";

// modal Style

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// Import Database
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  remove,
  update,
} from "firebase/database";

function App() {
  // database variable
  const database = getDatabase();

  // All state
  const [inputData, setinputData] = useState("");
  const [allTodoData, setallTodoData] = useState([]);
  const [realtime, setrealtime] = useState(false);
  const [editItem, seteditItem] = useState("");
  const [edited, setedited] = useState("");
  const [modalvalue, setmodalvalue] = useState("");

  // Get data from database
  useEffect(() => {
    const getTodoData = ref(database, "todom/");
    onValue(getTodoData, (snapshot) => {
      const alldata = [];
      snapshot.forEach((item) => {
        alldata.push({
          todoValue: item.val(),
          todoId: item.key,
        });
      });
      setallTodoData(alldata);
    });
  }, [realtime]);

  // HandleAdd
  const HandleAdd = () => {
    if (inputData !== "") {
      const add = ref(database, "todom/");
      set(push(add), {
        todoValue: inputData,
      })
        .then(() => {
          setrealtime(!realtime);
          setinputData("");
          console.log("uploaded");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Something wrong");
    }
  };

  // HandleDelete
  const HandleDelete = (deleted) => {
    remove(ref(database, "todom/" + deleted));
  };

  //  HandleEdit

  const HandleEdit = (edit, editText) => {
    seteditItem(edit);
    setedited(editText);
    setIsOpen(true);
  };

  //  HandleUpdate
  const HandleUpdate = (e) => {
    e.preventDefault();
    set(ref(database, "todom/" + editItem), {
      todoValue: modalvalue,
    })
      .then(() => {
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Modal functionality
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex justify-center h-[100vh] items-center">
        <div>
          <h1 className="text-center text-2xl font-sans font-bold uppercase">
            To<span className="text-red-600">do</span>
          </h1>
          <div className="flex gap-x-3">
            <input
              type="text"
              className="bg-yellow-600 text-white py-2 px-7 placeholder:text-white"
              placeholder="Add"
              onChange={(e) => setinputData(e.target.value)}
            />
            <button className="bg-red-800 text-white px-4" onClick={HandleAdd}>
              Add
            </button>
          </div>

          {allTodoData.map((item) => (
            <div key={item.todoId}>
              <p className="bg-black text-white my-3 px-2">
                {item.todoValue.todoValue}
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-yellow-500 text-black p-1 px-4"
                  onClick={() =>
                    HandleEdit(item.todoId, item.todoValue.todoValue)
                  }
                >
                  Edit
                </button>
                <button
                  className="bg-red-700 text-white py-1 px-4"
                  onClick={() => HandleDelete(item.todoId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button onClick={closeModal}>
              <IoCloseSharp className="text-red-800 text-4xl" />
            </button>

            <form>
              <input
                className="bg-yellow-700"
                value={modalvalue}
                placeholder={edited}
                onChange={(e) => setmodalvalue(e.target.value)}
              />
              <button onClick={HandleUpdate}>update</button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
