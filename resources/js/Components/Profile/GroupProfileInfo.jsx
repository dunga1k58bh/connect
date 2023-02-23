export default function GroupProfileInfo(props){

    const {group} = props;

    return (
        <div className="mt-[10px] w-full bg-white rounded-lg">
            <div className="header pt-[20px] pl-[20px]">
                <div className="font-bold text-[20px]">{props.title || ""}</div>
            </div>
            <div className="info p-[20px]">
                {props.children}
            </div>
        </div>
    )
}
