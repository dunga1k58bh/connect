<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;
use DateTime;


/** 
 *  @extends Factory<User>
 */

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $first_name =  fake()->firstName;
        $last_name =  fake()->lastName;
        $datestart = strtotime('1970-12-10'); //you can change it to your timestamp;
        $dateend = strtotime('2009-12-31'); //you can change it to your timestamp;

        $daystep = 86400;

        $datebetween = abs(($dateend - $datestart) / $daystep);

        $randomday = rand(0, $datebetween);

        $rd_birth_date = date("Y-m-d", $datestart + ($randomday * $daystep));

        return [
            'role' => 1,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'full_name' => $first_name . " " . $last_name,
            'phone' => fake()->phoneNumber,
            'gender' => fake()->randomElement(['male', 'female']),
            'password' => Hash::make("123456789"),
            'email' => fake()->unique()->safeEmail,
            'birth_date' => $rd_birth_date,
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
