export default function GroupsHeader(props) {
    const user = props.auth.user;

    return (
        <div className="flex justify-between">
            <div className="flex ">
                <button className="bg-blue-500 font-semibold text-white py-2 px-4 mx-[15px] border border-transparent rounded">
                    <a href={`../../groups/${user.id}`}>Your groups</a>
                </button>
                <button className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded">
                    <a href={`../groups/list_group_suggest/${user.id}`}>
                        Suggestions
                    </a>
                </button>
            </div>
        </div>
    );
}
