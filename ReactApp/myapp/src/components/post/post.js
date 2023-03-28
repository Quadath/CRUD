import './post.sass'

const Post = ({text, time}) => {

    const timeText = new Date(time).toString().slice(4, -35)
    return <li className="post list-group-item">
            <span>{text}</span>
            <i className="post-time">{timeText}</i>
        </li>
}

export default Post;