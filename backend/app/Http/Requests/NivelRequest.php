<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class NivelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'nivel' => [
                'required',
                'min:4',
                'max:30',
                $this->uniqueRule()
            ]
        ];
        return $rules;
    }

    protected function uniqueRule(): string
    {
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return "unique:nivels,nivel,{$this->route('id')},id";
        }
        return 'unique:nivels';
    }

    public function messages(): array
    {
        return [
            'nivel.unique' => 'Nível já cadastrado',
            'nivel.required' => 'O campo nível é obrigatório.',
            'nivel.min' => 'O campo nível deve ter pelo menos 4 caracteres.',
            'nivel.max' => 'O campo nível não pode ter mais de 30 caracteres.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'message' => 'Os dados fornecidos são inválidos.',
            'errors' => $validator->errors()
        ], 400);
        throw new HttpResponseException($response);
    }
}
