var socket = io();
// socket.on("gavai", (count) => {
//     console.log('hehe ' + count)
// })

document.getElementById('form-messages').addEventListener('submit', (e) => {
    e.preventDefault()
    const checkBadWords = (err) => {
        if (err) {
            return alert(err)
        }
        alert('sent messages')
    }
    const text = document.getElementById('input-messages').value
    socket.emit('send messages fr client to sv', text, checkBadWords)
})
socket.on('sendback client', (text) => {
    document.getElementById('show-p-text').innerHTML = text
})
socket.on('welcome user', (text) => {
    console.log(text)
})
document.getElementById('btn-share-location').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
       
        const { latitude, longitude } = position.coords
        socket.emit('send location fr cli to sv', { latitude, longitude })
    })
    // const position=navigator.geolocation.getCurrentPosition
    // console.log(navigator.geolocation.getCurrentPosition)
})
socket.on("send link to cli",(link)=>{
    document.getElementById('show-p-location').innerHTML = link
})
