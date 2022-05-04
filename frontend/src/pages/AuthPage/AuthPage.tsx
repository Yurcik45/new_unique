import './AuthPage.sass'
import animation from "../../assets/images/authPage/loadingAnimation.gif"

const AuthPage = () => {
    return (
        <div className="AuthPage">
            <img className="like" src={animation} alt="animation"/>
        </div>
    )
}

export default AuthPage;