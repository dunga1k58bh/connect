import { useForm } from "@inertiajs/inertia-react";

export default function GroupsHeader(props) {
    const user = props.auth.user;

    const {data, get} = useForm({});

    const getUrl = (url) => {
        get(route(url))
    }

    return (
        <div className="flex">
            <button className="bg-blue-500 font-semibold text-white py-2 px-4 mx-[15px] border border-transparent rounded">
                <a href={e => getUrl("group.feed")}>Your groups</a>
            </button>
            <button className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[15px] border border-blue-500 hover:border-transparent rounded">
                <a onClick={e => getUrl("group.suggestion")}>Suggestions</a>
            </button>
        </div>
    );
}
