import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const FormLeft = (props) => {
  const [state, setState] = useState({
    value: "false",
    name: "",
    id: "",
    nameForm: true,
  });

  const duplicate = (value) => {
    const { data } = props;
    let i = 0;
    data.forEach((element) => {
      const { name } = element;
      if (name === value) i += 1;
    });
    return i;
  };

  const add = () => {
    const { nameForm, close, getUserEditInfo } = props;
    const addNew = props.add;
    if (nameForm === true && state.name !== "") {
      if (duplicate(state.name) === 0) {
        addNew(state.name, state.value);
      }
    } else {
      const info = {};
      info.id = state.id;
      info.name = state.name;
      info.value = state.value;
      getUserEditInfo(info);
    }

    document.getElementById("myForm").value = "";
    close();
  };

  const slug = (strs) => {
    // Chuyển hết sang chữ thường
    let str = strs;
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, "");

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, "");

    // return
    return str;
  };
  const isChange = (event) => {
    const { name } = event.target;
    const value = slug(event.target.value);

    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    const { nameForm, userEditObject } = props;
    if (nameForm === true) {
      setState({
        ...state,
        titleForm: "Them",
        name: "",
        value: "false",
        id: "",
      });
    } else {
      setState({
        ...state,
        titleForm: "sua",
        name: userEditObject.name,
        value: userEditObject.value,
        id: userEditObject.id,
      });
    }
  }, []);

  const titleForm = () => {
    const { nameForm } = props;

    if (nameForm === true) {
      return "them";
    }
    return "sua";
  };

  const nameFun = () => {
    const { nameForm } = props;
    const { name } = state;

    if (nameForm === true) {
      return "";
    }
    return name;
  };

  //   render() {
  const { close } = props;
  const { userEditObject } = props;

  return (
    <div className="menu-left">
      <div className="title">
        <div className="add">{titleForm()}</div>
        <button
          type="button"
          className="icon-close fad fa-times-circle textright"
          onClick={close}
        />
      </div>
      <div className="panel-body">
        <div>
          <div>
            <div>Ten :</div>
          </div>
          <input
            name="name"
            id="myForm"
            type="text"
            className="name"
            onChange={(event) => isChange(event)}
            defaultValue={nameFun()}
          />
        </div>
        <div>
          <div>
            <div>Trạng Thái</div>
          </div>
          <select
            defaultValue={userEditObject.value}
            name="value"
            className="trangthai"
            onBlur={(event) => isChange(event)}
          >
            <option value="false">Ẩn</option>
            <option value="true">Kích hoạt</option>
          </select>
        </div>
        <div className="divbutton">
          <button type="button" className="button save" onClick={() => add()}>
            <i className="fal fa-plus" /> Lưu lại
          </button>
          <button type="button" className="button cancel" onClick={close}>
            <i className="fal fa-times" /> Huỷ bỏ
          </button>
        </div>
      </div>
    </div>
  );
};
FormLeft.propTypes = {
  nameForm: PropTypes.bool,
  add: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  getUserEditInfo: PropTypes.func.isRequired,
  userEditObject: PropTypes.objectOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
};
FormLeft.defaultProps = {
  nameForm: true,
  userEditObject: "",
  data: [],
};
export default FormLeft;
