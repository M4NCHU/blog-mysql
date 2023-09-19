import { getAuthSession } from "@/lib/auth"

const Navbar = async () => {
    const session = await getAuthSession()

    return (
        <div className="h-12 bg-red-500 flex flex-row justify-between items-center px-12">
            <h1>Blog</h1>
            {session ? (
                <p>
                    logged in
                </p>
            ): (
                <div>
                <a href="/sign-in">Zaloguj się</a>
            </div>
            )}
            
        </div>
    )
}

export default Navbar