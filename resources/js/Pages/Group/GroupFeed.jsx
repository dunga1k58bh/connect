import GroupFormCreate from "@/Components/Form/Group/Create";
import SearchBox from "@/Components/UI/SearchBox";
import GroupLayout from "@/Layouts/GroupLayout";
import { Button } from "@mui/material";

export default function GroupFeed(props){

    return (
        <GroupLayout>
            <div className="flex h-[100%]">
                <div className="w-[360px] h-[100%] bg-white">
                    <div className="header pt-[20px] px-[16px]">
                        <div className="title text-[24px] font-bold">Groups</div>
                        <SearchBox placeholder={"Search groups"}></SearchBox>
                    </div>

                    <div className="body px-[16px] py-[20px]">
                        <div className="button">
                            <GroupFormCreate></GroupFormCreate>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    sdfsd
                </div>
            </div>
        </GroupLayout>
    )
}
