<?php

namespace App\Services;

use App\Exceptions\CustomRequestException;
use Illuminate\Http\JsonResponse;

class ResponseService
{
    public function sendSuccess(string $title, string $message, int $statusCode = 200): JsonResponse
    {
        return response()->json([
            $title => $message
        ], $statusCode);
    }

    public function vericarRetorno(int $count)
    {
        if ($count == 0) {
            throw new CustomRequestException('Nenhum dado encontrado', 404);
        }
    }
}
