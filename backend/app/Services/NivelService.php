<?php

namespace App\Services;

use App\Exceptions\CustomRequestException;
use App\Models\Nivel;

class NivelService
{
    public function verificarNivel(string $id): Nivel
    {
        $nivel = Nivel::find($id);
        if (!$nivel) {
            throw new CustomRequestException('Nivel não encontrado', 404);
        }
        return $nivel;
    }
}
