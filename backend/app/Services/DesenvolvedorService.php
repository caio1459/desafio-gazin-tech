<?php

namespace App\Services;

use App\Exceptions\CustomRequestException;
use App\Models\Desenvolvedor;

class DesenvolvedorService
{
    public function verificarDev(string $id): Desenvolvedor
    {
        $dev = Desenvolvedor::find($id);
        if (!$dev) {
            throw new CustomRequestException('Desenvolvedor não encontrado', 404);
        }
        return $dev;
    }
}
