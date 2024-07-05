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
}
