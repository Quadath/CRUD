import './post.sass'

const Post = ({text, time, user}) => {

    const timeText = new Date(time).toString().slice(4, -35)
    return <li className="post list-group-item">
            <span>{text}</span>
            <div>
            <i className="post-time">{timeText}</i>
            <i className="post-user">{user}</i>
            </div>
        </li>
}

export default Post;