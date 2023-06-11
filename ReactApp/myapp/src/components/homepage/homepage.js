import './homepage.sass'

const HomePage = ({name}) => {
    return <h1 className="homepage__header">{name}
    <video src="https://i.imgur.com/gKc0N6H.mp4" autoPlay alt="funny GIF" width="50%"></video>
    </h1>
}

export default HomePage;