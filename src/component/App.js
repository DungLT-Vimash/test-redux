import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import "../fontawesome/css/all.css";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import Header from "./Header";
import FormLeft from "./FormLeft";
import FormRight from "./FormRight";
import { fetchListTask, addListData } from "../actions/todoActions";
// import { getList } from "../apis/task";

function App() {
  const [stateFunction, setState] = useState({
    showForm: false,
    searchText: "",
    userEditObject: {},
    editUserStatus: false,
    data: [],
    nameForm: true,
    addNew: false,
    update: true,
  });

  const dispatch = useDispatch();
  const data = useSelector((state) => state.todo.data);
  useEffect(() => {
    dispatch(fetchListTask());
    // let temp = 0;
    // if (data && temp === 0) {
    //   temp += 1;
    //   setState((x) => ({ ...x, data }));
    // }
  }, [dispatch]);
  const getUserEditInfoApp = (info) => {
    for (let i = 0; i < stateFunction.data.length; i += 1) {
      if (stateFunction.data[i].id === info.id) {
        stateFunction.data[i].name = info.name;
        stateFunction.data[i].value = info.value;
      }
    }
    localStorage.setItem("userData", JSON.stringify(stateFunction.data));
  };
  const getUserEditInfo = (info) => {
    getUserEditInfoApp(info);
  };
  const editUser = (user) => {
    stateFunction.userEditObject = user;
  };

  const getNewUserData = (name, value) => {
    const item = {};
    item.id = uuidv4();
    item.name = name;
    item.value = value;
    const items = stateFunction.data;
    console.log("items");
    console.log(data);
    items.push(item);
    // setState({ ...state, data: items });
    // localStorage.setItem("userData", JSON.stringify(items));
    dispatch(addListData(item));
    setState({ ...stateFunction, data: items });
  };

  const getTextSearch = (dl) => {
    setState({ ...stateFunction, searchText: dl });
  };

  const deleteUser = (idUser) => {
    const tempData = stateFunction.data.filter((item) => item.id !== idUser);
    setState({ ...stateFunction, data: tempData });
    localStorage.removeItem("userData", JSON.stringify(idUser));
  };

  const changeStatus = (id) => {
    const temp = stateFunction.data;
    for (let i = 0; i < temp.length; i += 1) {
      if (temp[i].id === id) {
        if (temp[i].value === "true") temp[i].value = "false";
        else if (temp[i].value === "false") temp[i].value = "true";
      }
    }
    // setState({ ...stateFunction, data: temp });
    // localStorage.setItem("userData", JSON.stringify(state.data));
  };

  // const showData = () => {
  //   const result = [];

  //   if (data) {
  //     try {
  //       console.log(data);
  //       data.forEach((element) => {
  //         result.push(element);
  //       });
  //     } catch {
  //       console.log(data);
  //     }
  //   }
  //   return result;
  // };

  return (
    <div className="App">
      <Header />
      <div className="main">
        {stateFunction.showForm && (
          <FormLeft
            nameForm={stateFunction.nameForm}
            add={(name, value) => getNewUserData(name, value)}
            close={() => setState({ ...stateFunction, showForm: false })}
            userEditObject={stateFunction.userEditObject}
            getUserEditInfo={(info) => getUserEditInfo(info)}
            data={stateFunction.data}
          />
        )}
        <FormRight
          onchangeform={() => {
            setState({
              ...stateFunction,
              showForm: true,
              nameForm: true,
              addNew: true,
            });
          }}
          deleteUser={(idUser) => deleteUser(idUser)}
          editFun={(user) => editUser(user)}
          getTextSearch={(dl) => getTextSearch(dl)}
          dataUserProps={data}
          changeStatus={(id) => changeStatus(id)}
          editclickbtn={() => {
            setState({
              ...stateFunction,
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
