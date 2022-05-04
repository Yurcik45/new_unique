const token = JSON.stringify(localStorage.getItem('token'))

if (token !== undefined || null) {
    setInterval(() => {
        localStorage.setItem('token', token)
    }, 3600)
}