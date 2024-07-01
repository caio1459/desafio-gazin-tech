<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nivel'
    ];

    public function desenvolvedor()
    {
        return $this->hasMany(Desenvolvedor::class);
    }
}
