import Post from "../post/post";

const Posts = ({posts}) => {
    return <ul className="list-group">
        {posts?.map(item => {
            return <Post text={item.text} time={item.time} key={item._id}/>
        })}
    </ul>
}

export default Posts;