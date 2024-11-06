import db from '../../config/db.js';

export const addCategory = async (req, res) => {
    const { name, parentCategoryId, description } = req.body;
    try {
        const [category] = await db.query('INSERT INTO CATEGORIES (parent_category_id, name, description) VALUES(?,?,?)', [parentCategoryId, name, description]);

        return res.status(201).json({
            valid: true,
            message: 'Category created successfully',
            category: category.insertId
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Category could not be added",
            error: err.message
        })
    }
}

export const getCategoryById = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM CATEGORIES WHERE category_id = ?', [id]);

        if(rows.length === 0){
            return  res.status(404).json({
                valid: false,
                message: "Category not found"
            })
        }

        return res.status(200).json({
            valid: true,
            message: "Category retrieved",
            category: rows
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Category could not be retrieved",
            error: err.message
        })
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM CATEGORIES');

        return res.status(200).json({
            valid: true,
            message: "Categories retrieved",
            category: rows
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Category could not be retrieved",
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.query('DELETE FROM CATEGORIES WHERE category_id = ?', [id]);

        if(rows.affectedRows === 0){
            return  res.status(404).json({
                valid: false,
                message: "Category not found"
            })
        }

        return res.status(200).json({
            valid: true,
            message: "Category deleted",
            category: rows
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Category could not be deleted",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {

}