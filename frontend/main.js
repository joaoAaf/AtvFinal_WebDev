const users = "http://localhost:8080/users"
const loginUrl = "http://localhost:8080/login"
let token

async function getToken(admLogin) {
    await axios.post(loginUrl, admLogin)
      .then(response =>{
        token = response.data.token
        window.location.href = "gestao.html"
      })
      .catch(error => {
        console.log(error)
    })
  }

async function axiosGet() {
    axios.get(users, {
        headers: {
            Authorization: token
        }
    })
        .then(response => {
            const data = response.data
            getUsers(data)
        })
        .catch(error => {
            window.location.href = "login.html"
            console.log(error)
        })
}

async function axiosDelete(id) {
    axios.delete(`${users}/${id}`, {
        headers: {
            Authorization: token
        }
    })
        .then(() => {
            alert("Usuário Excluído")
            deleteUser(id)
        }
        )
        .catch(error => {
            //window.location.href = "login.html"
            console.log(error)
        })
}

async function axiosCancel(id) {
    axios.get(`${users}/${id}`, {
        headers: {
            Authorization: token
        }
    })
        .then(response => {
            const user = response.data
            cancel(user, id)
        })
        .catch(error => {
            //window.location.href = "login.html"
            console.log(error)
        })
}

async function axiosUpdate(id, user) {
    axios.get(`${users}/${id}`, {
        headers: {
            Authorization: token
        }
    })
        .then(response => {
            const userOld = response.data
            user.name = empty(user.name, userOld.name)
            user.email = empty(user.email, userOld.email)
            user.tel = empty(user.tel, userOld.tel)
            user.status = empty(user.status, userOld.status)
            axios.put(`${users}/${id}`, user, {
                headers: {
                    Authorization: token
                }
            })
                .then(() => {
                    alert("Usuário Atualizado!")
                    axiosCancel(id)
                })
                .catch(error => {
                    //window.location.href = "login.html"
                    console.log(error)
                })
        })
        .catch(error => {
            //window.location.href = "login.html"
            console.log(error)
        })
}

async function axiosRegister() {
    const user = register()
    if (user != null) {
        axios.post(users, user, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                const userNew = response.data
                window.location.href = "gestao.html"
            })
            .catch(error => {
                window.location.href = "login.html"
                console.log(error)
            })
    }
    else {
        alert("Preencha todos os campos!")
    }
}

function login() {
    let input = document.getElementById('loginusername')
    let login = input.value
    input.value = ''
    input = document.getElementById('loginpassword')
    let pass = input.value
    input.value = ''
    if (login == '' || pass == '') {
        return null
    }
    else {
        let admLogin = {
            login: login,
            pass: pass
        }
        getToken(admLogin)
    }
}

function register() {
    let input = document.getElementById('registername')
    let name = input.value
    input.value = ''
    input = document.getElementById('registeremail')
    let email = input.value
    input.value = ''
    input = document.getElementById('registertel')
    let tel = input.value
    input.value = ''
    if (name == '' || email == '' || tel == '') {
        return null
    }
    else {
        let user = {
            name: name,
            email: email,
            tel: tel,
            status: true
        }
        return user
    }
}

function deleteUser(id) {
    const tbody = document.getElementById('tableUsers')
    const tr = document.getElementById(id)
    tbody.removeChild(tr)
}

function updateUserInit(id) {
    const tr = document.getElementById(id)
    let td = document.getElementById(id + "0")
    td.appendChild(addInput("text", "Digite um nome", id + "i0"))

    td = document.getElementById(id + "1")
    td.appendChild(addInput("email", "Digite um email", id + "i1"))

    td = document.getElementById(id + "2")
    td.appendChild(addInput("tel", "Digite um telefone", id + "i2"))

    td = document.getElementById(id + "3")
    let select = document.createElement('select')
    select.id = id + "i3"
    select.className = "form-select"
    let option1 = document.createElement('option')
    option1.selected = ''
    option1.innerHTML = "Selecione a situação do usuário"
    let option2 = document.createElement('option')
    option2.value = '1'
    option2.innerHTML = "Ativo"
    let option3 = document.createElement('option')
    option3.value = '2'
    option3.innerHTML = "Inativo"
    select.appendChild(option1)
    select.appendChild(option2)
    select.appendChild(option3)
    td.appendChild(select)

    td = document.getElementById(id + "4")
    tr.removeChild(td)
    td = document.createElement('td')
    td.id = id + "4"
    let div = document.createElement('div')
    div.className = "d-grid gap-2 col-6"
    div.appendChild(addButton("Aplicar", 2, id))
    div.appendChild(addButton("Cancelar", 3, id))
    td.appendChild(div)
    tr.appendChild(td)
}

function updateUserDone(id) {
    let input = document.getElementById(id + "i0")
    let name = input.value
    input = document.getElementById(id + "i1")
    let email = input.value
    input = document.getElementById(id + "i2")
    let tel = input.value
    let select = document.getElementById(id + "i3")
    let status = select.selectedIndex
    if (status == '1') {
        status = true
    }
    else if (status == '2') {
        status = false
    }
    else {
        status = ''
    }
    let user = {
        name: name,
        email: email,
        tel: tel,
        status: status
    }
    return user
}

function empty(userData, userOldData) {
    if (userData === '') {
        return userOldData
    }
    else {
        return userData
    }
}

function cancel(user, id) {
    const tr = document.getElementById(id)
    let td = document.getElementById(id + "0")
    tr.removeChild(td)
    td = document.getElementById(id + "1")
    tr.removeChild(td)
    td = document.getElementById(id + "2")
    tr.removeChild(td)
    td = document.getElementById(id + "3")
    tr.removeChild(td)
    td = document.getElementById(id + "4")
    tr.removeChild(td)

    td = document.createElement('td')
    td.id = user.id + "0"
    td.innerHTML = user.name
    tr.appendChild(td)

    td = document.createElement('td')
    td.id = user.id + "1"
    td.innerHTML = user.email
    tr.appendChild(td)

    td = document.createElement('td')
    td.id = user.id + "2"
    td.innerHTML = user.tel
    tr.appendChild(td)

    td = document.createElement('td')
    td.id = user.id + "3"
    if (user.status == true) {
        let strong = document.createElement('strong')
        strong.style = "color: darkolivegreen;font-size: larger;"
        strong.innerHTML = "Ativo"
        td.appendChild(strong)
    }
    else {
        let strong = document.createElement('strong')
        strong.style = "color: crimson;font-size: larger;"
        strong.innerHTML = "Inativo"
        td.appendChild(strong)
    }
    tr.appendChild(td)

    td = document.createElement('td')
    td.id = user.id + "4"
    let div = document.createElement('div')
    div.className = "d-grid gap-2 col-6"
    div.appendChild(addButton("Remover", 0, user.id))
    div.appendChild(addButton("Alterar", 1, user.id))
    td.appendChild(div)
    tr.appendChild(td)
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
        td.id = user.id + "0"
        td.innerHTML = user.name
        tr.appendChild(td)

        td = document.createElement('td')
        td.id = user.id + "1"
        td.innerHTML = user.email
        tr.appendChild(td)

        td = document.createElement('td')
        td.id = user.id + "2"
        td.innerHTML = user.tel
        tr.appendChild(td)

        td = document.createElement('td')
        td.id = user.id + "3"
        if (user.status == true) {
            let strong = document.createElement('strong')
            strong.style = "color: darkolivegreen;font-size: larger;"
            strong.innerHTML = "Ativo"
            td.appendChild(strong)
        }
        else {
            let strong = document.createElement('strong')
            strong.style = "color: crimson;font-size: larger;"
            strong.innerHTML = "Inativo"
            td.appendChild(strong)
        }
        tr.appendChild(td)

        td = document.createElement('td')
        td.id = user.id + "4"
        let div = document.createElement('div')
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

function addInput(type, placeHolder, id) {
    const input = document.createElement('input')
    input.id = id
    input.type = type
    input.className = "form-control"
    input.placeholder = placeHolder
    input.value = ''
    return input
}

function click(num, id) {
    if (num == 0) {
        axiosDelete(id)
    }
    else if (num == 1) {
        updateUserInit(id)
    }
    else if (num == 2) {
        axiosUpdate(id, updateUserDone(id))
    }
    else if (num == 3) {
        axiosCancel(id)
    }
}