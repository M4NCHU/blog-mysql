const Navbar = async () => {
    return (
        <div className="h-12 bg-red-500 flex flex-row justify-between items-center px-12">
            <h1>Blog</h1>
            <div>
                <a href="/sign-in">Zaloguj się</a>
            </div>
        </div>
    )
}

export default Navbar