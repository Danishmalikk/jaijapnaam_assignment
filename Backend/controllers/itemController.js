const itemModel = require("../models/itemModel")



const getAllItems = async (req, res) => {
  try {
    const items = await itemModel.find({ userId: req.user.id })
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}


const createItem = async (req, res) => {
  try {
    const { name, description } = req.body

    const userId = req.user.id
    if(!name || !description) { 
      return res.status(400).json({status : 400, success : false, message : "name and description is required" })
    }
    const newItem = new itemModel({
      name,
      description,
      userId: userId,
    })

    const savedItem = await newItem.save()
    res.status(201).json(savedItem)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create item', error: err.message })
  }
}

const updateItem = async (req, res) => {
  try {
    const item = await itemModel.findOne({ _id: req.params.id, userId: req.user.id })
    if (!item) return res.status(404).json({ message: 'Item not found' })

    item.name = req.body.name || item.name
    item.description = req.body.description || item.description

    const updatedItem = await item.save()
    res.json(updatedItem)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err.message })
  }
}


const deleteItem = async (req, res) => {
  try {
    const item = await itemModel.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!item) return res.status(404).json({ message: 'Item not found' })

    res.status(200).json({ message: 'Item deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item', error: err.message })
  }
}

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
}
