/* eslint-disable react/prop-types */
export default function FormChange( {register, setRegister} ) {

    function handleClick() {
        setRegister(!register)
      }

    if (register) {
        return (
            <p onClick={handleClick} className="text-xs cursor-pointer mt-2">I am already a member, take me to log in</p>
        )
    }

    return (
        <p onClick={handleClick} className="text-xs cursor-pointer mt-2">I need to sign up, take me to register</p>
    )

}