import css from './DeleteBtn.module.css';

const DeleteBtn = ({ onClick }) => {
  return (
    <button className={css.btn_delete} type="button" onClick={onClick}>
      Delete
    </button>
  );
};

export default DeleteBtn;
