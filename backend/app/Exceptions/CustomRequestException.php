<?php

namespace App\Exceptions;

use Exception;

class CustomRequestException extends Exception
{
    protected $message;
    protected $code;

    public function __construct($message = null, $code = 0)
    {
        parent::__construct($message, $code);
    }

    public function render()
    {
        return response()->json([
            'message' => $this->message
        ], $this->code);
    }
}
