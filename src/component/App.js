
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import '../App.css';
import FormLeft from './FormLeft';
import FormRight from './FormRight';
import '../fontawesome/css/all.css';
import React, { useState, useEffect } from 'react';
import "./../App.css";
function App() {
  const [state, setState] = useState({
    showForm: false,
    searchText: "",
    userEditObject: [],
    editUserStatus: false,
    data: [],
    nameForm: true,
    addNew: false,
    update: true,
  });
  // useEffect ( () => {
  //   if (localStorage.getItem("userData") === null) {
  //     localStorage.setItem("userData", []);
  //   } else {
  //     const temp = JSON.parse(localStorage.getItem("userData"));
  //     setState({...state,data: temp})
  //   }
  // });

  //   React.useEffect(() => {}, []);

  //   //didmound
  //   React.useEffect(() => {

  //   }, []);

  //   // didupdate
  //   React.useEffect(() => {

  //   }, [state.showForm]);
  // //unwillmount
  //   React.useEffect(() => {
  //     return () => {}
  //   }, []);
  useEffect(() => {

      
    if (localStorage.getItem("userData") === null) {
      localStorage.setItem("userData", []);
    } else {
      
      const temp = JSON.parse(localStorage.getItem("userData"));
      setState({ ...state, data: temp });       
     
    }
   
  }, []);

  const getUserEditInfo = (info) => {
    getUserEditInfoApp(info);
  };

  const getUserEditInfoApp = (info) => {
    state.data.map((value) => {
      if (value.id === info.id) {
        value.name=info.name;
        value.value=info.value;
      }
    });
    localStorage.setItem('userData', JSON.stringify(state.data));
  };

  const editUser = (user) => {
    state.userEditObject= user
  };

  const getNewUserData = (name, value) => {
    let item = {};
    item.id = uuidv4();
    item.name = name;
    item.value = value;
    let items = state.data;
    items.push(item);
    setState({ ...state, data: items });
    localStorage.setItem('userData', JSON.stringify(items));
  };

  const getTextSearch = (dl) => {
    setState({ ...state, searchText: dl });
  };

  const deleteUser = (idUser) => {
    const tempData = state.data.filter((item) => item.id !== idUser);
    setState({ ...state, data: tempData });
    localStorage.removeItem('userData', JSON.stringify(idUser));
  };

  const update = (info) => {
    if (update) {
      getUserEditInfo(info);
    }
  };

  const changeStatus = (id) => {
    let temp =state.data;
    
     temp.map((element) => {
      if (element.id === id) {

        if (element.value === "true") return element.value = "false";
        if (element.value === "false") return element.value = "true";
      }
    });
    
    setState({...state,data:temp})
    localStorage.setItem('userData', JSON.stringify(state.data));
  };

  const showData = () => {
    let result = [];
 
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
            onchangeform={() => setState({...state,showForm:true,addNew:true})}
            close={() => setState({ ...state, showForm: false })}
            getUserEditInfoApp={(info) => getUserEditInfoApp(info)}
            userEditObject={state.userEditObject}
            getTextSearch={(dl) => getTextSearch(dl)}
            editUserStatus={state.editUserStatus}
            addNew={state.addNew}
            getUserEditInfo={(info) => getUserEditInfo(info)}
            data={state.data}
          />
        )}
        <FormRight
          onchangeform={() => {setState({...state,showForm:true,nameForm:true,addNew:true})          }}
          deleteUser={(idUser) => deleteUser(idUser)}
          update={() => setUpdate(!update)}
          editFun={(user) => editUser(user)}
          getTextSearch={(dl) => getTextSearch(dl)}
          dataUserProps={showData()}
          changeStatus={(id) => changeStatus(id)}
          editclickbtn={()=>{setState({...state, showForm:true,nameForm:false,addNew:false})}}
        />
      </div>
    </div>
  );
}

export default App;
