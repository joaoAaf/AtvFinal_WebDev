const users = "http://localhost:8080/users"

axiosGet(users)

function axiosGet(users) {
axios.get(users)
    .then(response => {
        const data = response.data
        getUsers(data)
    })
    .catch(error => console.log(error))
}

function axiosDelete(id) {
    axios.delete(`${users}/${id}`)
        .then(response => {
            alert("Usuário Excluído")
            deleteUser(id)}
        )
        .catch(error => console.log(error))
}

function deleteUser(id) {
    const tbody = document.getElementById('tableUsers')
    const tr = document.getElementById(id)
    tbody.removeChild(tr)
}

function updateUserInit(id) {
    const td = document.getElementById(id+"1")
    td.innerHTML = "Deu certo!"
}

function getUsers(data) {
    const tbody = document.getElementById('tableUsers')
    for (user of data) {

        const tr = document.createElement('tr')
        tr.className = "align-middle"
        tr.id = user.id

        let td = document.createElement('td')
        td.innerHTML = user.id
        tr.appendChild(td)

        td = document.createElement('td')
        td.id = user.id+"0"
        td.innerHTML = user.name
        tr.appendChild(td)

        td = document.createElement('td')
        td.id = user.id+"1"
        td.innerHTML = user.email
        tr.appendChild(td)

        td = document.createElement('td')
        div = document.createElement('div')
        div.className = "d-grid gap-2 col-6"
        div.appendChild(addButton("Remover", 0, user.id))
        div.appendChild(addButton("Alterar", 1, user.id))
        td.appendChild(div)
        tr.appendChild(td)

        tbody.appendChild(tr)
    }
}

function addButton(nome, num, id) {
    const button = document.createElement('button')
    button.type = "button"
    button.innerHTML = nome
    button.className = "btn btn-primary"
    button.onclick = function () { click(num, id) }
    return button
}

function click(num, id) {
    if (num == 0) {
        axiosDelete(id)
    }
    else if (num == 1) {
        updateUserInit(id)
    }
}

