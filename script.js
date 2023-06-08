// Getting all the required elements
const leftListContainer = document.querySelector(".left-list-container");
const rightListContainer = document.querySelector(".right-list-container");
const resetButton = document.querySelector("button.reset-button");
const appWrapper = document.querySelector(".app-wrapper");

// List of characters from harry potter and marvel cinematic universe
const leftList = [
  "Hermione Granger",
  "Harry Potter",
  "Lord Voldemort",
  "Professor Albus Dumbledore",
  "Iron Man",
  "Spider-Man",
  "Captain America",
  "Thor",
  "Hulk",
];

const showMessage = (message) => {
  document.querySelectorAll('.message').forEach((item) => {
    item.remove();
  });
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message');
  messageContainer.innerText = message;
  appWrapper.appendChild(messageContainer);
  setTimeout(() => {
    messageContainer.classList.add('popout');
    setTimeout(() => {
      messageContainer.remove();
    }, 990);
  }, 2000);
  //  += `<div class="message">${message}</div>`;
}

let draggingElement = null;

const onDragStart = (e) => {
  // e.preventDefault();
  // console.log(e);
  draggingElement = e.target;
  e.target.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", e.target.innerHTML);
};
const onDragEnd = (e) => {
  // e.preventDefault();
  // console.log(e);
  e.target.classList.remove("dragging");
};

const onContainerDragOver = (e) => {
  e.preventDefault();
  return false;
};

const onContainerDragEnter = (e) => {
  if (e.target.classList.contains("dragging")) return;
  e.target.classList.add("on-top");
};

const onContainerDragLeave = (e) => {
  e.target.classList.remove("on-top");
};

const onDrop = (e) => {
  e.stopPropagation();
  console.log(e.dataTransfer.getData("text/plain"));
  e.target.classList.remove("on-top");
  draggingElement.draggable = false;
  draggingElement.classList.add('dragged');
  rightListContainer.appendChild(draggingElement);
  draggingElement = null;
  showMessage('Item added to right list');
  return false;
};

const onContainerDragEnd = (e) => {

}
/**
 * This function is used to remove the list item but it is not used in this project
 */
// const onRemove = (e) => {
//   e.stopPropagation();
//   e.target.parentNode.remove();
//   return false;
// };

const getListItem = (item, customClass, id) => {
  return `
            <li
              ondragstart="onDragStart(event)" 
              ondragend="onDragEnd(event)" 
              draggable="true" 
              class="list-item ${customClass}" 
              id="${id}"
            >
            ${item}
            </li>
          `;
};

rightListContainer.addEventListener("drop", onDrop);
rightListContainer.addEventListener("dragover", onContainerDragOver);
rightListContainer.addEventListener('dragenter', onContainerDragEnter);
rightListContainer.addEventListener('dragleave', onContainerDragLeave);
rightListContainer.addEventListener('dragend', onContainerDragEnd);

const appInit = () => {
  console.log("App Init");
  leftListContainer.innerHTML = "";
  rightListContainer.innerHTML = "";
  // Setting left and right list items
  leftList.map((item, idx) => {
    leftListContainer.innerHTML += getListItem(
      item,
      "left-list-item",
      `left-${idx}`
    );
  });
};

appInit();
resetButton.onclick = appInit;
