export default function Form({className, handleSubmit, inputs}){
    return (
        <form className={`${className}`} onSubmit={handleSubmit}>
            {inputs.map(input => input)}

            <button type="submit">Submit</button>
        </form>
    )
}