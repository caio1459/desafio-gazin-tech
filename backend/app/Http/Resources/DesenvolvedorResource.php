<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DesenvolvedorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'sexo' => $this->sexo,
            'idade' => $this->idade,
            'hobby' => $this->hobby,
            'nivel' => new NivelResource($this->whenLoaded('nivel'))
        ];
    }
}
