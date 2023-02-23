export default function ProfileInfo(props){

    const {user} = props;

    return (
        <div className="mt-[16px] w-full bg-white rounded-lg">
            <div className="header pt-[20px] pl-[20px]">
                <div className="font-bold text-[20px]">Infomation</div>
            </div>
            <div className="info p-[20px]"></div>
        </div>
    )
}
