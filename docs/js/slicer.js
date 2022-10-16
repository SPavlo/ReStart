
const slicer  = document.querySelector("#slicer")
const back  = document.querySelector("#back")


back.addEventListener("mousemove", ev => {
    slicer.style.width = ev.offsetX + "px"
})