export default function RequestFriendsHeader(props) {
    const user = props.auth.user;
    return (
        <div className="flex">
            <a href={`../../friends/${user.id}`}>
                <button className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded">
                    Friend
                </button>
            </a>
            <a href={`../get_request_friends/${user.id}`}>
                <button className="bg-blue-500 font-semibold text-white py-2 px-4 mx-[15px] border border-transparent rounded">
                    Friend requests
                </button>
            </a>
            <a href={`../get_unknown_people/${user.id}`}>
                <button className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded">
                    Suggestions
                </button>
            </a>
            <a href={`../get_sent_friends/${user.id}`}>
                <button className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded">
                    Friend sent
                </button>
            </a>
        </div>
    );
}
