import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../redux/reducers/categoryReducer";

Modal.setAppElement("#root");

const CategoryManager = () => {
  const dispatch = useDispatch();
  const {
    items: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);

  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(false);
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="category-manager">
      <h2>Manage Categories</h2>
      <button className="btn primary" onClick={() => setShowModal(true)}>
        Create Category
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <ul className="category-list">
        {categories.map((category) => (
          <li key={category._id} className="category-item">
            {category.name}
            <div className="actions">
              <button className="btn small" onClick={() => handleEdit(category)}>
                Edit
              </button>
              <button
                className="btn small danger"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
          setCategoryName("");
          setEditingCategory(null);
        }}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>{editingCategory ? "Edit Category" : "Create Category"}</h3>
        <form onSubmit={handleSubmit} className="category-form">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
          />
          <div className="form-actions">
            <button type="submit" className="btn primary">
              {editingCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setShowModal(false);
                setCategoryName("");
                setEditingCategory(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <style jsx>{`
        .category-manager {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h2 {
          margin-bottom: 20px;
        }

        .btn {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn.primary {
          background-color: #007bff;
          color: white;
        }

        .btn.danger {
          background-color: #dc3545;
          color: white;
        }

        .btn.small {
          font-size: 12px;
          padding: 4px 8px;
          margin-left: 5px;
        }

        .category-list {
          list-style: none;
          padding: 0;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .actions button {
          margin-left: 5px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .modal h3 {
          margin-top: 0;
        }

        .category-form input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
        }

        .error {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default CategoryManager;
