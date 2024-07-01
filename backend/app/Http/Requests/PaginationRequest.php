<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PaginationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'itens' => [
                'sometimes', //Valida se o campo for preenchido
                'integer',
                'min:1',
            ],
            'sort' => [
                'sometimes',
                'string',
            ],
            'order' => [
                'sometimes',
                'in:asc,desc',
            ],
        ];
        return $rules;
    }

    public function messages(): array
    {
        return [
            'itens.integer' => 'O filtro itens só aceita numeros.',
            'itens.min' => 'O filtro itens não aceitar valor igual ou menor que zero.',
            'order.in' => 'O filtro order deve ser somente "asc" ou "desc".',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'message' => 'Os filtros fornecidos são inválidos.',
            'errors' => $validator->errors()
        ], 400);
        throw new HttpResponseException($response);
    }
}
