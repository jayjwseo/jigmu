// ******** Collection of obsolete functions ********

// <------------------------- Generate Node List from an array containing DOM elements then append
function renderStatusDropOption(jData) {
  const x = jData.board.map((list) => {
    return createDropOption(list);
  });
  const y = toNodeList(x);
  return y;
}

function toNodeList(fromArray) {
  const fragment = document.createDocumentFragment();
  fromArray.forEach((item) => {
    fragment.appendChild(item.cloneNode(true));
  });
  return fragment.childNodes;
}

for (let i = 0; i < optionNodeList.length; i++) {
  item.append(optionNodeList[i]);
}
// -------------------------->
// <-------------------------- Generate fragment, mutate with elements created from looping an array then return
function createListOptionElement(listTitle, listId) {
  const element = document.createElement("option");
  element.innerText = listTitle;
  element.value = listId;
}
function renderStatusDropOption(jData) {
  const template = document.querySelector("#status-drop-option-template");
  const templateClone = template.content.cloneNode(true);
  const menuElement = templateClone.querySelector("[data-status-drop-menu]");

  jData.board.forEach((list) => {
    const listTitle = list.title;
    const listId = list.id;
    const element = document.createElement("a");
    element.innerText = listTitle;
    element.dataset.listId = listId;
    element.classList.add(
      "dropdown-item",
      "task-card-drop-item",
      "data-status-change"
    );
    menuElement.append(element);
  });
  return templateClone;
}
//HTML Template
// <!-- </template>

// <template id="status-drop-option-template">
//     <div class="dropdown-menu task-card-drop" data-status-drop-menu>
//         <a class="dropdown-item task-card-drop-item" data-status-change>DONE</a>
//     </div>
// </template> -->
// -------------------------->
