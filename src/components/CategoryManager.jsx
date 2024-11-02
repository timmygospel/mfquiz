import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../redux/reducers/categoryReducer";

const CategoryManager = () => {
  const dispatch = useDispatch();
  const {
    items: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      dispatch(updateCategory({ id: editingCategory._id, name: categoryName }));
    } else {
      dispatch(createCategory({ name: categoryName }));
    }
    setCategoryName("");
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditingCategory(category);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        <button type="submit">{editingCategory ? "Update" : "Create"}</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}{" "}
            <button onClick={() => handleEdit(category)}>Edit</button>{" "}
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
