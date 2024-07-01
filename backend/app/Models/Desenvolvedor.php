<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Desenvolvedor extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'hobby',
        'nivel_id',
        'sexo',
        'data_nascimento'
    ];

    public function nivel()
    {
        return $this->belongsTo(Nivel::class);
    }

    public function getIdadeAttribute()
    {
        return Carbon::parse($this->data_nascimento)->age;
    }
}
