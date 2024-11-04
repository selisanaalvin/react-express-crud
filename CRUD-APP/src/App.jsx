import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addItem, editItem, deleteItem, setItems } from './features/itemSlice';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const API_URL = 'http://localhost:5000/api/items'; // Your API endpoint

const App = () => {
  const [editingId, setEditingId] = useState(null);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('response:', response.data)
      dispatch(setItems(response.data));
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, [dispatch]);

  const handleAddItem = async (item) => {
    try {
      const response = await axios.post(API_URL, item);
      dispatch(addItem(response.data));
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleEditItem = async (id, details) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, details);
      dispatch(editItem({ id: response.data._id, details: response.data.details }));
      fetchItems();
    } catch (error) {
      console.error('Failed to edit item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(deleteItem(id)); 
      showToastMessage('Please fill in all fields.', 'danger');
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Item List</h1>
      <ItemForm
        editingId={editingId}
        currentItem={items.find(item => item._id === editingId) || {}}
        setEditingId={setEditingId}
        onUpdate={handleEditItem}
        onAdd={handleAddItem}
      />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDeleteItem} />
    </div>
  );
};

export default App;
