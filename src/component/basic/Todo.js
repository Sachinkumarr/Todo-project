import React, { useState, useEffect } from "react";

const getLocalData = () => {
  const lists = localStorage.getItem("todolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [togglebutton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && togglebutton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editItem = (index) => {
    const editedItem = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(editedItem.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main_div">
        <div className="child-div">
          <figure className="inner-child1">
            <img src="./todo.svg" alt="todologo" />
            <figcaption>Add your list Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item"
              className="form-control"
              autoFocus
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            ></input>

            {togglebutton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="fa fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="fa fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn-effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
