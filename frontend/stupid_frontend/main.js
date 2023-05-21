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

function getUsers(data) {
    const tbody = document.getElementById('tableUsers')
    for (user of data) {

        const tr = document.createElement('tr')
        tr.id = user.id

        let td = document.createElement('td')
        td.innerHTML = user.id
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = user.name
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = user.email
        tr.appendChild(td)

        td = document.createElement('td')
        td.appendChild(addButton("Remover", 0, user.id))
        tr.appendChild(td)

        tbody.appendChild(tr)
    }
}

function addButton(nome, num, id) {
    const button = document.createElement('button')
    button.type = "button"
    button.innerHTML = nome
    button.className = "btn btn-primary btn-lg"
    button.onclick = function () { click(num, id) }
    return button
}

function click(num, id) {
    if (num == 0) {
        axiosDelete(id)
    }
    else if (num == 1) {
        alert("2º click!")
    }
}

