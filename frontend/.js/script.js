const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".message")
const chatMessages = chat.querySelector(".chat__messages")

const user = { id: "", name: "" }
let webSocket

const createMessageSelfElement = (content) => {
    const div = document.createElement("div")
    div.classList.add("me__message")
    div.innerHTML = content
    return div
}

const createMessageOtherElement = (content, sender) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("__message")
    div.classList.add("me__message")
    span.classList.add("message--sender")

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content


    return div
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({ data }) => {
    console.log(JSON.parse(data))

    const { userId, userName, content } = JSON.parse(data)

    const message = userId == user.id ? createMessageSelfElement(content) : createMessageOtherElement(content, userName)

    
    


    chatMessages.appendChild(message)
    scrollScreen()
}


const handleLogin = (event) => {
    event.preventDefault()

    const nomeDigitado = loginInput.value.trim()

    const nomesAutorizados = ["Narut0", "Hinat4"]


    if (!nomesAutorizados.includes(nomeDigitado)) {
        alert("Acesso negado! Você não tem permissão pra entrar. 🚫")
        return
    }

    user.id = crypto.randomUUID()
    user.name = loginInput.value

    login.style.display = "none"
    chat.style.display = "flex"

    webSocket = new WebSocket("")
    webSocket.onmessage = processMessage

}

const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        content: chatInput.value
    }

    webSocket.send(JSON.stringify(message))

    chatInput.value = ""

}


loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)
