export default function DeleteModal({ show, setShow, handleConfirm, id }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p>⛔ Are you sure you want to delete this movie?</p>
        <div className="del-btns">
          <button className="del-btn-yes" onClick={() => handleConfirm(id)}>
            YES
          </button>
          <button className="del-btn-no" onClick={() => setShow(false)}>
            NO
          </button>
        </div>
      </section>
    </div>
  );
}
