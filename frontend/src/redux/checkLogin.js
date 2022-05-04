export let falseLogged = false;

export const checklogin = (error) => {
    if (error.response?.statusText === undefined) {
        console.log("status text undefined");
    } else {
        if (
            error.response.statusText === "Unauthorized"
            || localStorage.getItem("token") === null
            || localStorage.getItem("token") === undefined
            ) {
            console.log("loc is null", localStorage.getItem("token"));
            localStorage.clear()
            window.location.replace("/login")
            falseLogged = true
        }
    }
    // console.error("status text ?", error.response?.statusText);
}