import Crisp from 'react-crisp'

const CrispChat = props => {
    return (
        <div styles={{display: "none"}}>
            <Crisp
            crispWebsiteId="a0690576-ae5c-4dad-8ba6-400c0028a04a"
            // crispTokenId="a-unique-token-for-the-user"
            crispRuntimeConfig={{
                session_merge: true,
            }}
            attributes={{
                "user:email": ["testmail@gmail.com"],
                "user:nickname": ["yu45"],
            }}
            configuration={{
                "position:reverse": [false],
            }}
            set={{
                "message:text": ["hey hi user"]
            }}
            safeMode
        />
        </div>
    )
}

export default CrispChat;