<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class DesenvolvedorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'nome' => [
                'required',
                'min:2',
                'max:30',
            ],
            'sexo' => [
                'required',
                'in:M,F',
            ],
            'data_nascimento' => [
                'required',
            ],
            'hobby' => [
                'required',
                'max:60',
            ],
            'nivel_id' => [
                'required',
                'exists:nivels,id'
            ]
        ];
        return $rules;
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O campo nome é obrigatório.',
            'nome.min' => 'O campo nome deve ter pelo menos 2 caracteres.',
            'nome.max' => 'O campo nome não pode ter mais de 30 caracteres.',
            'sexo.required' => 'O campo sexo é obrigatório.',
            'sexo.in' => 'O campo sexo deve ser "M" para masculino ou "F" para feminino.',
            'data_nascimento.required' => 'O campo data de nascimento é obrigatório.',
            'hobby.required' => 'O campo hobby é obrigatório.',
            'hobby.max' => 'O campo hobby não pode ter mais de 60 caracteres.',
            'nivel_id.required' => 'O campo nivel_id é obrigatório.',
            'nivel_id.exists' => 'O nível especificado não está cadastrado.'
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
