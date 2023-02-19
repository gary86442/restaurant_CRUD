const deleBTN = document.querySelector("#deleBTN");

deleBTN.addEventListener("click", (event) => {
  console.log("TEST");
  const name = event.target.dataset.name;
  const id = event.target.dataset.id;
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
