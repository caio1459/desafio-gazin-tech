<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Desenvolvedor",
 *     type="object",
 *     title="Desenvolvedor",
 *     required={"nome", "hobby", "nivel_id", "sexo", "data_nascimento"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID do desenvolvedor"
 *     ),
 *     @OA\Property(
 *         property="nome",
 *         type="string",
 *         description="Nome do desenvolvedor"
 *     ),
 *     @OA\Property(
 *         property="hobby",
 *         type="string",
 *         description="Hobby do desenvolvedor"
 *     ),
 *     @OA\Property(
 *         property="sexo",
 *         type="string",
 *         description="Sexo do desenvolvedor"
 *     ),
 *     @OA\Property(
 *         property="data_nascimento",
 *         type="string",
 *         format="date",
 *         description="Data de nascimento do desenvolvedor"
 *     ),
 *     @OA\Property(
 *         property="nivel_id",
 *         type="integer",
 *         description="ID do nível do desenvolvedor"
 *     ),
 *     @OA\Property(
 *         property="idade",
 *         type="integer",
 *         description="Idade do desenvolvedor",
 *         readOnly=true
 *     )
 * )
 */
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
