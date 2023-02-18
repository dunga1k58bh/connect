<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Relation;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RelationSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = User::all();
        for ($i = 0; $i < MAX_USER_SEEDER - 1; $i++)
            for ($j = $i + 1; $j < MAX_USER_SEEDER; $j++) {
                $status = fake()->randomElement([UNKNOWN_PEOPLE, FRIEND, SENDER, RECEIVER]);

                $datestart = strtotime('2018-12-10'); //you can change it to your timestamp;
                $dateend = strtotime('2023-02-18'); //you can change it to your timestamp;

                $daystep = 86400;

                $datebetween = abs(($dateend - $datestart) / $daystep);

                $randomday = rand(0, $datebetween);

                $rd_date = date("Y-m-d", $datestart + ($randomday * $daystep));

                DB::table('relations')->insert(
                    [
                        "user_id1" => $user[$i]["id"],
                        "user_id2" => $user[$j]["id"],
                        "status" => $status == UNKNOWN_PEOPLE ? UNKNOWN_PEOPLE : ($status == FRIEND ? FRIEND : ($status == SENDER ? SENDER : RECEIVER)),
                        "created_at" => $rd_date,
                        "updated_at" => $rd_date,
                    ],
                    

                );
                DB::table('relations')->insert(

                    [
                        "user_id1" => $user[$j]["id"],
                        "user_id2" => $user[$i]["id"],
                        "status" => $status == UNKNOWN_PEOPLE ? UNKNOWN_PEOPLE : ($status == FRIEND ? FRIEND : ($status == SENDER ? RECEIVER : SENDER)),
                        "created_at" => $rd_date,
                        "updated_at" => $rd_date,
                    ],
                );
            }
    }
}
