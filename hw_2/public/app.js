document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }
  if (event.target.dataset.type === 'change') {
    const id = event.target.dataset.id
    const noteTextContent = document.getElementById(id).querySelector('span').textContent
    const title = prompt('Введите новое название', noteTextContent)
    
    changeNote(id, title).then(() => {
      console.log('писька')
      document.getElementById(id).querySelector('span').textContent = title
    })
  }
})

async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}

async function changeNote(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT', 
    body: JSON.stringify({ 'title': title }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
 })
    .then(() => {
      document.getElementById(id).querySelector('span').textContent = title
    })
}