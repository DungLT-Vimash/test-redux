import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import "../fontawesome/css/all.css";
import Header from "./Header";
import FormLeft from "./FormLeft";
import FormRight from "./FormRight";

function App() {
  const [state, setState] = useState({
    showForm: false,
    searchText: "",
    userEditObject: {},
    editUserStatus: false,
    data: [],
    nameForm: true,
    addNew: false,
    update: true,
  });

  useEffect(() => {
    if (localStorage.getItem("userData") === null) {
      localStorage.setItem("userData", []);
    } else {
      const temp = JSON.parse(localStorage.getItem("userData"));
      setState((x) => ({ ...x, data: temp }));
    }
  }, []);

  const getUserEditInfoApp = (info) => {
    for (let i = 0; i < state.data.length; i += 1) {
      if (state.data[i].id === info.id) {
        state.data[i].name = info.name;
        state.data[i].value = info.value;
      }
    }
    localStorage.setItem("userData", JSON.stringify(state.data));
  };
  const getUserEditInfo = (info) => {
    getUserEditInfoApp(info);
  };
  const editUser = (user) => {
    state.userEditObject = user;
  };

  const getNewUserData = (name, value) => {
    const item = {};
    item.id = uuidv4();
    item.name = name;
    item.value = value;
    const items = state.data;
    items.push(item);
    setState({ ...state, data: items });
    localStorage.setItem("userData", JSON.stringify(items));
  };

  const getTextSearch = (dl) => {
    setState({ ...state, searchText: dl });
  };

  const deleteUser = (idUser) => {
    const tempData = state.data.filter((item) => item.id !== idUser);
    setState({ ...state, data: tempData });
    localStorage.removeItem("userData", JSON.stringify(idUser));
  };

  const changeStatus = (id) => {
    const temp = state.data;
    for (let i = 0; i < temp.length; i += 1) {
      if (temp[i].id === id) {
        if (temp[i].value === "true") temp[i].value = "false";
        else if (temp[i].value === "false") temp[i].value = "true";
      }
    }
    setState({ ...state, data: temp });
    localStorage.setItem("userData", JSON.stringify(state.data));
  };

  const showData = () => {
    const result = [];

    state.data.forEach((item) => {
      if (item.name.indexOf(state.searchText) !== -1) {
        result.push(item);
      }
    });
    return result;
  };

  return (
    <div className="App">
      <Header />
      <div className="main">
        {state.showForm && (
          <FormLeft
            nameForm={state.nameForm}
            add={(name, value) => getNewUserData(name, value)}
            close={() => setState({ ...state, showForm: false })}
            userEditObject={state.userEditObject}
            getUserEditInfo={(info) => getUserEditInfo(info)}
            data={state.data}
          />
        )}
        <FormRight
          onchangeform={() => {
            setState({
              ...state,
              showForm: true,
              nameForm: true,
              addNew: true,
            });
          }}
          deleteUser={(idUser) => deleteUser(idUser)}
          editFun={(user) => editUser(user)}
          getTextSearch={(dl) => getTextSearch(dl)}
          dataUserProps={showData()}
          changeStatus={(id) => changeStatus(id)}
          editclickbtn={() => {
            setState({
              ...state,
              showForm: true,
              nameForm: false,
              addNew: false,
            });
          }}
        />
      </div>
    </div>
  );
}

export default App;
