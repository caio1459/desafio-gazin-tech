<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class PaginationService
{
    public function paginate(Request $request, Builder $query, array $camposFiltrados = []): array
    {
        //Qtd de items que vão ser filtrados, padrão de 10
        $itens = $request->input('itens', 10);
        // Ordenação por campo, sendo por padrão o id
        $sort = $request->input('sort', 'id');
        // Ordena por desc e asc, sendo asc o padrão
        $order = $request->input('order', 'asc');

        // Aplica filtros
        foreach ($camposFiltrados as $campo) {
            if ($request->has($campo)) {
                $valor = $request->input($campo);
                if (is_string($valor)) {
                    $query->where($campo, 'LIKE', '%' . $valor . '%');
                } else {
                    $query->where($campo, $valor);
                }
            }
        }

        // Aplica ordenação e paginação
        $data = $query->orderBy($sort, $order)->paginate($itens);

        return [
            'data' => $data->items(),
            'meta' => [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
            ],
        ];
    }
}
