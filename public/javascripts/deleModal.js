// console.log("TEST");
const deleBTNs = document.querySelectorAll(".deleBTN");
// console.log(deleBTNs);
deleBTNs.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const btn = event.target.classList.contains(".deleBTN")
      ? event.target
      : event.target.parentElement;
    const name = btn.dataset.name;
    const id = btn.dataset.id;
    console.log(name, id);
    const body = document.querySelector("#deleModalBody");
    const footer = document.querySelector("#deleModalFooter");

    body.innerHTML = `將 ${name}從餐廳清單中移除？`;
    footer.innerHTML = `<button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >取消</button>
        <form
          action="/restaurants/${id}/delete"
          method="post"
          style="display: inline;"
          onsubmit="return delete_comfirm()"
        >

          <button type="submit" class="btn btn-danger">刪除</button>`;
  });
});
