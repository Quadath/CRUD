import './page-switch.sass'

const PageSwitch = ({page, setPage}) => {
    return (
        <div className="page-switch">
            <button className="btn btn-secondary" onClick={() => setPage(page - 1)}> prev </button>
            <b>{page}</b>
            <button className="btn btn-secondary" onClick={() => setPage(page + 1)}> next </button>
        </div>
    )
}

export default PageSwitch