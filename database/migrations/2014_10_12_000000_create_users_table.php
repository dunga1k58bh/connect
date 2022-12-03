<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->integer("role");

            $table->string('email')->unique();
            $table->string('phone')->nullable();

            $table->timestamp('birth_date');
            $table->string("firstname");
            $table->string('lastname');
            $table->string('gender');
            $table->string('avatar')->nullable();
            $table->string('cover_photo')->nullable();

            $table->string('profile_link')->nullable();
            $table->text('data')->nullable();

            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
