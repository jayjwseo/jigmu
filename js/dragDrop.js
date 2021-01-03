function dragDrop() {
  document.addEventListener("mousedown", (e) => {
    if (e.target.matches("[data-draggable")) console.log("Mouse down");
  });
}

export { dragDrop };
