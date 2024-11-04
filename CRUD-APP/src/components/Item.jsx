import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const Item = ({ item, onEdit, onDelete }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      {item.text}
      <div>
        <Button variant="warning" onClick={() => onEdit(item)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(item.id)}>Delete</Button>
      </div>
    </ListGroup.Item>
  );
};

export default Item;
