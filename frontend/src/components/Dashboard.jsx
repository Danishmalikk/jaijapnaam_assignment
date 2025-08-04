import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createItem, deleteItem, getItems, updateItem } from '../api/Auth'
import Swal from 'sweetalert2'

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState({ name: '', description: '' })
  const [editItem, setEditItem] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetchItems()
  }, [])

const fetchItems = async () => {
  try {
    const res = await getItems(token)
    setItems(res.data)
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }

const handleAdd = async () => {
  try {
    const res = await createItem(newItem, token)
    setItems([...items, res.data])
    setNewItem({ name: '', description: '' })
    Swal.fire({
      icon: 'success',
      title: 'Added successfully ',
      text: res.data.message,
    })
  } catch (err) {
    const message = err?.response?.data?.message || 'Something went wrong'
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    })
  }
}

const handleUpdate = async () => {
  try {
    console.log("edititem id ", editItem)
    const res = await updateItem(editItem._id, editItem, token)
    setItems(items.map(item => item._id === res.data._id ? res.data : item))
    setEditItem(null)
  } catch (err) {
    console.error('Update failed:', err)
  }
}

const handleDelete = async (id) => {
  try {
    await deleteItem(id, token)
    setItems(items.filter(item => item._id !== id))
  } catch (err) {
    console.error('Delete failed:', err)
  }
}

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-gray-600">Welcome, <strong>{user?.name}</strong>!</p>
            <p className="text-sm text-gray-500">Email: {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Add New Item */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Add New Item</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Name"
              value={newItem.name}
              onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Description"
              value={newItem.description}
              onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-6 py-2 mt-3 rounded hover:bg-green-600 transition"
          >
            Add Item
          </button>
        </div>

        {/* Edit Item */}
        {editItem && (
          <div className="border-t mt-8 pt-6">
            <h3 className="text-xl font-semibold mb-4">Edit Item</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={editItem.name}
                onChange={e => setEditItem({ ...editItem, name: e.target.value })}
              />
              <input
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={editItem.description}
                onChange={e => setEditItem({ ...editItem, description: e.target.value })}
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
              >
                Update Item
              </button>
              <button
                onClick={() => setEditItem(null)}
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Item List */}
        <div className=" mt-8 pt-6">
          <h3 className="text-xl font-semibold mb-4">Items List</h3>
          {items.length === 0 ? (
            <p className="text-gray-600">No items available.</p>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li
                  key={item.id}
                  className="flex justify-between items-start bg-gray-100 p-4 rounded shadow-sm hover:shadow transition"
                >
                  <div>
                    <p className="text-lg font-medium">{item.name}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditItem(item)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
