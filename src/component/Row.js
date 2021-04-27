import React from "react";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Row = (props) => {
  const value = () => {
    if (props.value === "true") return "kich hoat";
    if (props.value === "false") return "an";
    return null;
  };

  const colorStatus = () => {
    const value1 = props.value;
    if (value1 === "true") {
      return "button label-danger";
    }
    if (value1 === "false") {
      return "button btn-hide";
    }
    return null;
  };

  const editClick = () => {
    const { editFunClick, editclickbtn } = props;
    editFunClick();
    editclickbtn();
  };

  const deleteButtonClick = (idUser) => {
    // props.deleteButtonClick(idUser);
    const { deleteButtonClick } = props;
    confirmAlert({
      title: "Xoa cong viec",
      message: "Are you sure to do ",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteButtonClick(idUser),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const { stt, userName, id, changeStatus } = props;
  return (
    <tr>
      <th className="column ">{stt + 1}</th>
      <th className="column column-name">{userName}</th>
      <th>
        <button
          className={colorStatus()}
          id="status"
          type="button"
          onClick={() => changeStatus(id)}
        >
          {value()}
        </button>
      </th>
      <th>
        <button
          type="button"
          className="button btn-edit"
          onClick={() => editClick()}
        >
          <i className="fad fa-edit" /> Sua
        </button>
        <button
          className="button btn-delete"
          type="button"
          onClick={() => deleteButtonClick(id)}
        >
          <i className="fas fa-trash-alt" /> Xoa
        </button>
      </th>
    </tr>
  );
};
Row.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  editFunClick: PropTypes.string.isRequired,
  editclickbtn: PropTypes.string.isRequired,
};
export default Row;
