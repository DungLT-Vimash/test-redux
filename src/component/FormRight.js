import React, { useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import Row from "./Row";
import "react-toggle/style.css";

const FormRight = (props) => {
  const [state, setState] = useState({
    tempValue: "",
    isActive: false,
    sort: "",
  });

  // setState({...state, isActive: true});
  const handleChange = (event) => {
    const { value } = event.target;
    setState({ ...state, sort: value });
  };

  const isChange = (event) => {
    setState({ ...state, tempValue: event.target.value });
    props.getTextSearch(state.tempValue);
  };

  const handleToggle = () => {
    setState({ ...state, isActive: !state.isActive });
  };

  const deleteButtonClick = (idUser) => {
    props.deleteUser(idUser);
  };

  const compareAZ = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  const compareZA = (a, b) => {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return 1;
    }
    return 0;
  };

  const statusHide = (a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  };

  const statusActive = (a, b) => {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  };

  const listSort = () => {
    let result = null;
    if (state.isActive === true && state.sort === "") {
      result = (
        <div className="sort-list" id="sort">
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameAZ", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down" /> Tên A-Z{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameZA", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down-alt" /> Tên Z-A{" "}
          </button>
          <hr />
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "statusActive", isActive: false })
            }
          >
            Trang thai kich hoat{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "statusHide", isActive: false })
            }
          >
            Trang thai an{" "}
          </button>
        </div>
      );
    }
    if (state.isActive === true && state.sort === "nameAZ") {
      return (
        <div className="sort-list" id="sort">
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameAZ", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down" /> Tên A-Z{" "}
            <i className="fas fa-check" />{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameZA", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down-alt" /> Tên Z-A{" "}
          </button>
          <hr />
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "statusActive", isActive: false })
            }
          >
            Trang thai kich hoat{" "}
          </button>
          <button
            type="button"
            onClick={() => setState({ sort: "statusHide", isActive: false })}
          >
            Trang thai an{" "}
          </button>
        </div>
      );
    }
    if (state.isActive === true && state.sort === "nameZA") {
      return (
        <div className="sort-list" id="sort">
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameAZ", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down" /> Tên A-Z{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameZA", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down-alt" /> Tên Z-A{" "}
            <i className="fas fa-check" />
          </button>
          <hr />
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "statusActive", isActive: false })
            }
          >
            Trang thai kich hoat{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "statusHide", isActive: false })
            }
          >
            Trang thai an{" "}
          </button>
        </div>
      );
    }
    if (state.isActive === true && state.sort === "statusActive") {
      return (
        <div className="sort-list" id="sort">
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameAZ", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down" /> Tên A-Z{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameZA", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down-alt" /> Tên Z-A{" "}
          </button>
          <hr />
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "statusActive", isActive: false })
            }
          >
            Trang thai kich hoat <i className="fas fa-check" />{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "statusHide", isActive: false })
            }
          >
            Trang thai an{" "}
          </button>
        </div>
      );
    }
    if (state.isActive === true && state.sort === "statusHide") {
      return (
        <div className="sort-list" id="sort">
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameAZ", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down" /> Tên A-Z{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "nameZA", isActive: false })
            }
          >
            <i className="fas fa-sort-alpha-down-alt" /> Tên Z-A{" "}
          </button>
          <hr />
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "statusActive", isActive: false })
            }
          >
            Trang thai kich hoat{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ ...state, sort: "statusHide", isActive: false })
            }
          >
            Trang thai an <i className="fas fa-check" />
          </button>
        </div>
      );
    }
    return result;
  };

  const mappingDataUser = () => {
    if (props.dataUserProps !== null && state.sort === "") {
      return props.dataUserProps.map((value, key) => (
        <Row
          key={value.id}
          deleteButtonClick={(idUser) => deleteButtonClick(idUser)}
          changeStatus={(id) => props.changeStatus(id)}
          editFunClick={() => props.editFun(value)}
          userName={value.name}
          editclickbtn={props.editclickbtn}
          stt={key}
          value={value.value}
          id={value.id}
        />
      ));
    }
    if (props.dataUserProps !== null && state.sort === "nameAZ") {
      return props.dataUserProps
        .sort(compareAZ)
        .map((value, key) => (
          <Row
            key={value.id}
            deleteButtonClick={(idUser) => deleteButtonClick(idUser)}
            changeStatus={(id) => props.changeStatus(id)}
            editFunClick={() => props.editFun(value)}
            userName={value.name}
            stt={key}
            value={value.value}
            id={value.id}
          />
        ));
    }
    if (props.dataUserProps !== null && state.sort === "nameZA") {
      return props.dataUserProps
        .sort(compareZA)
        .map((value, key) => (
          <Row
            deleteButtonClick={(idUser) => deleteButtonClick(idUser)}
            changeStatus={(id) => props.changeStatus(id)}
            editFunClick={() => props.editFun(value)}
            key={value.id}
            userName={value.name}
            stt={key}
            value={value.value}
            id={value.id}
          />
        ));
    }

    if (props.dataUserProps !== null && state.sort === "statusActive") {
      return props.dataUserProps
        .sort(statusActive)
        .map((value, key) => (
          <Row
            deleteButtonClick={(idUser) => deleteButtonClick(idUser)}
            changeStatus={(id) => props.changeStatus(id)}
            editFunClick={() => props.editFun(value)}
            userName={value.name}
            key={value.id}
            stt={key}
            value={value.value}
            id={value.id}
          />
        ));
    }
    if (props.dataUserProps !== null && state.sort === "statusHide") {
      return props.dataUserProps
        .sort(statusHide)
        .map((value, key) => (
          <Row
            deleteButtonClick={(idUser) => deleteButtonClick(idUser)}
            changeStatus={(id) => props.changeStatus(id)}
            editFunClick={() => props.editFun(value)}
            userName={value.name}
            key={value.id}
            stt={key}
            value={value.value}
            id={value.id}
          />
        ));
    }
    if (props.dataUserProps !== null && state.sort === "hide") {
      const result = [];
      props.dataUserProps.forEach((element) => {
        if (element.value === "false") {
          result.push(element);
        }
      });
      return result.map((value, key) => (
        <Row
          deleteButtonClick={(idUser) => deleteButtonClick(idUser)}
          changeStatus={(id) => props.changeStatus(id)}
          editFunClick={() => props.editFun(value)}
          userName={value.name}
          stt={key}
          value={value.value}
          key={value.id}
          id={value.id}
        />
      ));
    }
    if (props.dataUserProps !== null && state.sort === "active") {
      const result = [];
      props.dataUserProps.forEach((element) => {
        if (element.value === "true") {
          result.push(element);
        }
      });
      return result.map((value, key) => (
        <Row
          key={value.id}
          deleteButtonClick={(idUser) => deleteButtonClick(idUser)}
          changeStatus={(id) => props.changeStatus(id)}
          editFunClick={() => props.editFun(value)}
          userName={value.name}
          stt={key}
          value={value.value}
          id={value.id}
        />
      ));
    }
    return null;
  };
  const { onchangeform } = props;
  return (
    <div className="div-right">
      <div>
        <button type="button" className="button btnadd" onClick={onchangeform}>
          <i className="far fa-plus" /> Them Cong Viec
        </button>
      </div>
      <div>
        <input
          type="text"
          onChange={debounce((event) => isChange(event), 500)}
        />
        <button
          type="button"
          className="button btnadd"
          onClick={() => props.getTextSearch(state.tempValue)}
        >
          <i className="far fa-search" /> tim
        </button>
        <div className="btnsort">
          <button
            className="button btnadd "
            type="button"
            onClick={() => handleToggle()}
          >
            sap xep <i className="fad fa-caret-square-down " />
          </button>

          {listSort()}
        </div>
      </div>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th>STT</th>
              <th>Ten</th>
              <th>Trang Thai</th>
              <th>Hanh Dong</th>
            </tr>
            <tr>
              <td />
              <td>
                <input
                  type="text"
                  className="lname"
                  name="find"
                  onChange={(event) => isChange(event)}
                />
              </td>
              <td>
                <select className="trangthai" onBlur={handleChange}>
                  <option value="">Tat ca</option>
                  <option name="active" value="active">
                    Kích hoạt
                  </option>
                  <option name="hide" value="hide">
                    Ẩn
                  </option>
                </select>
              </td>
              <td />
            </tr>
            {mappingDataUser()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
FormRight.propTypes = {
  onchangeform: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  editFun: PropTypes.func.isRequired,
  getTextSearch: PropTypes.func.isRequired,
  dataUserProps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  changeStatus: PropTypes.func.isRequired,
  editclickbtn: PropTypes.func.isRequired,
};
FormRight.defaultProps = {
  dataUserProps: [],
};
export default FormRight;
