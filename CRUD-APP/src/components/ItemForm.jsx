import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Toast } from 'react-bootstrap';

const ItemForm = ({ editingId, currentItem, setEditingId, onAdd, onUpdate }) => {
  const [itemDetails, setItemDetails] = useState({ name: '', desc: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');
  
  useEffect(() => {
    if (editingId && currentItem) {
      setItemDetails(currentItem);
    } else {
      setItemDetails({ name: '', desc: '' });
    }
  }, [editingId, currentItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemDetails.name || !itemDetails.desc) {
      showToastMessage('Please fill in all fields.', 'danger');
      return;
    }

    if (editingId) {
      onUpdate(editingId, itemDetails);
      showToastMessage('Item updated successfully!', 'success');
    } else {
      onAdd(itemDetails);
      showToastMessage('Item added successfully!', 'success');
    }

    setItemDetails({ name: '', desc: '' });
    setEditingId(null);
  };

  const showToastMessage = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col sm={4}>
            <label>Name:</label>
          </Col>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder=""
              value={itemDetails.name}
              onChange={(e) => setItemDetails({ ...itemDetails, name: e.target.value })}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <label>Description:</label>
          </Col>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder=""
              value={itemDetails.desc}
              onChange={(e) => setItemDetails({ ...itemDetails, desc: e.target.value })}
            />
          </Col>
        </Row>
        <Button type="submit" className="mt-3">
          {editingId ? 'Edit Item' : 'Add Item'}
        </Button>
      </Form>

      {/* Toast Notification */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1050 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide bg={toastVariant}>
          <Toast.Body>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default ItemForm;
