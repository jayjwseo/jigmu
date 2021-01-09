// Drag and drop
function dragDrop(dragCompleteInfo) {
  document.addEventListener("mousedown", (e) => {
    if (!e.target.matches("[data-draggable]")) return;
    const selectedTaskCard = e.target.closest(".task-card");
    // Clone for drag-active
    const selectedClone = selectedTaskCard.cloneNode(true);
    const selectedRect = selectedTaskCard.getBoundingClientRect();
    const offset = {
      x: e.clientX - selectedRect.left,
      y: e.clientY - selectedRect.top,
    };
    selectedClone.style.width = `${selectedRect.width}px`;
    selectedClone.classList.add("drag-active");
    // Clone for placeholder
    const placeholder = selectedTaskCard.cloneNode();
    placeholder.style.height = `${selectedRect.height}px`;
    placeholder.classList.add("drag-placeholder");
    placeholder.innerHTML = "";
    // Mouse move function
    const mouseMove = (e) => {
      // selectedTaskCard.classList.add("d-none");
      document.body.style.cursor = "grabbing";
      // Render drag-active clone
      document.body.append(selectedClone);
      positionClone(selectedClone, e, offset);
      // Render placeholder
      const dropCanvas = dropZone(e.target);
      if (dropCanvas == null) return;
      // Mouse position above top-half of a task card
      const closestTaskCardBelow = Array.from(dropCanvas.children).find(
        (child) => {
          const rect = child.getBoundingClientRect();
          return e.clientY < rect.top + rect.height / 2;
        }
      );
      selectedTaskCard.classList.add("d-none");
      if (closestTaskCardBelow) {
        // Place above the existing task card
        dropCanvas.insertBefore(placeholder, closestTaskCardBelow);
      } else {
        dropCanvas.append(placeholder);
      }
    };
    document.addEventListener("mousemove", mouseMove);
    // Mouse up function
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", mouseMove);
        // Check placeholder task card canvas then insert selected task card
        const finalDropZone = dropZone(placeholder);
        if (finalDropZone) {
          const initialDropZone = dropZone(selectedTaskCard);
          finalDropZone.insertBefore(selectedTaskCard, placeholder);
          dragCompleteInfo({
            taskCard: selectedTaskCard,
            endDropZone: finalDropZone,
            startDropZone: initialDropZone,
            index: Array.from(finalDropZone.children).indexOf(selectedTaskCard),
          });
        }
        selectedTaskCard.classList.remove("d-none");
        document.body.style.cursor = "auto";
        selectedClone.remove();
        placeholder.remove();
      },
      { once: true }
    );
  });
}
// Drag-active clone position
function positionClone(selectedClone, mousePosition, offset) {
  selectedClone.style.left = `${mousePosition.clientX - offset.x}px`;
  selectedClone.style.top = `${mousePosition.clientY - offset.y}px`;
}
// Drop zone - task card canvas
function dropZone(target) {
  if (target.matches("[data-drop-zone-list-canvas]")) {
    return target.querySelector(".task-card-canvas");
  } else {
    const list = target.closest("[data-drop-zone-list-canvas]");
    if (list) {
      return list.querySelector(".task-card-canvas");
    } else {
      return null;
    }
  }
}
// Export
export { dragDrop };
