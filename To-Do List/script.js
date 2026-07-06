const edits = document.querySelectorAll('.edit');

edits.forEach(edit => {
    edit.addEventListener('click', ()=>{
        // e.preventDefault();

        const todo = edit.closest(".todo");
        const eform = todo.querySelector(".edit-form");
        let task = todo.querySelector('.task');

    eform.classList.remove("hidden");
    task.style.display = 'none';

});
});

