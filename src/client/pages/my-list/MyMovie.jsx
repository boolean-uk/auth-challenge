const MyMovie = ({ myMovie }) => {
    const {title, description, runtimeMins} = myMovie.movie
    return(
        <>
            <li>
                <article>
                    <h3>{title}</h3>
                    <h4>description:</h4>
                    <p>{description}</p>
                    <h4>runtime</h4>
                    <p>{runtimeMins}</p>
                </article>
            </li>
        </>
    )
}

export { MyMovie }    