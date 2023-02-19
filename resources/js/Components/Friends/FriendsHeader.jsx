
export default function FriendsHeader(props) {
    const user = props.auth.user;
    return (
        <div className="flex">
            <button className="bg-blue-500 font-semibold text-white py-2 px-4 mx-[15px] border border-transparent rounded">
                <a href={`../friends/${user.id}`}>Friend</a>
            </button>
            <button className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded">
                <a href={`get_request_friends/${user.id}`}>Friend requests</a>
            </button>
            <button className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded">
                <a href={`get_unknown_people/${user.id}`}>Suggestions</a>
            </button>
            <button className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded">
                <a href={`get_sent_friends/${user.id}`}>Friend sent</a>
            </button>
        </div>
    );
}
