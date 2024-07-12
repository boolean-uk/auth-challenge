/* eslint-disable react/prop-types */
export default function FormChange( {register, setRegister} ) {

    function handleClick() {
        setRegister(!register)
      }

    if (register) {
        return (
            <p onClick={handleClick} className="text-xs cursor-pointer">I am already a member, take me to log in</p>
        )
    }

    return (
        <p onClick={handleClick} className="text-xs cursor-pointer">I need to sign up, take me to register</p>
    )

}