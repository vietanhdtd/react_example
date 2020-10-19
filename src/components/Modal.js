import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { filterVar, defaultFilter } from "../configs/cache";
import { useReactiveVar } from "@apollo/react-hooks";
import { GET_FILTER } from "../configs/queries";

export default function CustomModal(props) {
  const { toggle, show, centered } = props;

  const data = useReactiveVar(filterVar);

  const [listCheckbox, setChecked] = useState([]);

  useEffect(() => {
    if (data) {
      setChecked(data);
    }
  }, [data]);

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    const transformList = listCheckbox.map((i) => ({
      ...i,
      checked: i.id === id ? checked : i.checked,
    }));
    setChecked(transformList);
  };

  const handleCheckAll = (e) => {
    const transformList = listCheckbox.map((i) => ({
      ...i,
      checked: e.target.checked,
    }));
    setChecked(transformList);
  };

  const handleSubmit = () => {
    filterVar(listCheckbox);
    toggle();
  };

  const handleClose = () => {
    toggle();
  };

  const isCheckedAll = listCheckbox.find((i) => !i.checked);

  return (
    <>
      <Modal centered={centered} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What to show: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Check
            type={"checkbox"}
            onChange={handleCheckAll}
            checked={!isCheckedAll}
            id="score"
            label="Show All"
          />
          {listCheckbox.map((item) => (
            <Form.Check
              key={item.id}
              type={"checkbox"}
              onChange={handleCheck}
              checked={item.checked}
              id={item.id}
              label={item.label}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
