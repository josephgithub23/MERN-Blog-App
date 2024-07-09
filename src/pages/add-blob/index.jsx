import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import classes from "./styles.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * We receive the form state as a prop form the parent component which is the GlobalState.
 *
 */
export default function AddNewBlob() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSaveToDb() {
    const response = isEdit
      ? await axios.put(
          `http://localhost:5000/api/blog/update/${location.state.getCurrentBlogItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:5000/api/blog/add", {
          title: formData.title,
          description: formData.description,
        });
    const result = await response.data;
    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, [location]);

  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit Blog " : "Add A Blog"}</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Enter Blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        />
        <button onClick={handleSaveToDb}>
          {isEdit ? "Edit Blog " : "Add A Blog"}
        </button>
      </div>
    </div>
  );
}
