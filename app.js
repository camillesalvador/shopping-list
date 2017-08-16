var state = {
  items: [
    {
      displayItem: "apples",
      checked: false
    },
    {
      displayItem: "oranges",
      checked: false
    },
    {
      displayItem: "milk",
      checked: true
    },
    {
      displayItem: "bread",
      checked: false
    }
  ]
};

// state management
function addItem(state, item) {
  state.items.push({
    displayItem: item,
    checked: false
  });
}

function toggleItem(state, itemIndex) {
  state.items[itemIndex].checked = !state.items[itemIndex].checked;
}

function deleteItem(state, itemIndex) {
  state.items.splice(itemIndex, 1);
}

// DOM manipulation
function renderList(state, element) {
  var html = state.items.map(function(item, index) {
    var extra = '';
    if(item.checked) {
      extra = ' shopping-item__checked';
    }
    var str = '<li id="' + index + '">' +
      '<span class="shopping-item' + extra + '">' + item.displayItem + '</span>' +
      '<div class="shopping-item-controls">' +
        '<button class="shopping-item-toggle">' +
          '<span class="button-label">check</span>' +
        '</button>&nbsp;' +
        '<button class="shopping-item-delete">' +
          '<span class="button-label">delete</span>' +
        '</button>' +
      '</div>' +
    '</li>';

    return str;
  });
  element.html(html);
}


// Event listeners
function handleAddItem(formElement, newItemIdentifier, listElement) {
  $(formElement).submit(function(event) {
    event.preventDefault();
    addItem(state, $(newItemIdentifier).val());
    renderList(state, listElement);
  });
}

function handleToggleItem(toggleIdentifier, listElement) {
  $(listElement).on('click', toggleIdentifier, function(event) {
    event.stopPropagation();
    var itemIndex = $(event.currentTarget.closest('li')).attr('id');
    toggleItem(state, itemIndex);
    renderList(state, listElement);
  });
}

function handleDeleteItem(removeIdentifier, listElement) {
  $(listElement).on('click', removeIdentifier, function(event) {
    event.stopPropagation();
    var itemIndex = $(event.currentTarget.closest('li')).attr('id');
    deleteItem(state, itemIndex);
    renderList(state, listElement);
  });
}

$(function() {
  var formElement = $('#js-shopping-list-form');
  var listElement = $('.shopping-list');
  var newItemIdentifier = '#shopping-list-entry';
  var removeIdentifier = '.shopping-item-delete';
  var toggleIdentifier = '.shopping-item-toggle';
  
  handleAddItem(formElement, newItemIdentifier, listElement);
  handleToggleItem(toggleIdentifier, listElement);
  handleDeleteItem(removeIdentifier, listElement);
});
