<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Nivel",
 *     type="object",
 *     title="Nivel",
 *     required={"nivel"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID do nível"
 *     ),
 *     @OA\Property(
 *         property="nivel",
 *         type="string",
 *         description="Nome do nível"
 *     ),
 *     @OA\Property(
 *         property="devs_count",
 *         type="integer",
 *         description="Quantidade de desenvolvedores associados"
 *     )
 * )
 */
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
