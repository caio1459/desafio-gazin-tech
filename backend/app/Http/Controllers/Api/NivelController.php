<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\CustomRequestException;
use App\Http\Controllers\Controller;
use App\Http\Requests\NivelRequest;
use App\Http\Requests\PaginationRequest;
use App\Http\Resources\NivelResource;
use App\Models\Nivel;
use App\Services\NivelService;
use App\Services\PaginationService;
use App\Services\ResponseService;
use Illuminate\Http\Request;

class NivelController extends Controller
{
    protected $nivelService;
    protected $responseService;
    protected $paginationService;

    public function __construct(
        NivelService $nivelService,
        ResponseService $responseService,
        PaginationService $paginationService
    ) {
        $this->nivelService = $nivelService;
        $this->responseService = $responseService;
        $this->paginationService = $paginationService;
    }

    public function index(PaginationRequest $request)
    {
        $query = Nivel::query();
        $camposFiltrados = ['id', 'nivel'];
        $result = $this->paginationService->paginate($request, $query, $camposFiltrados);

        try {
            $this->responseService->vericarRetorno(count($result['data']));
            return response()->json([
                'data' => NivelResource::collection(collect($result['data'])),
                'meta' => $result['meta'],
            ]);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }

    public function store(NivelRequest $request)
    {
        $data = $request->validated();
        $nivel = Nivel::create($data);
        return new NivelResource($nivel);
    }

    public function update(NivelRequest $request, string $id)
    {
        try {
            $nivel = $this->nivelService->verificarNivel($id);
            $data = $request->validated();
            $nivel->update($data);
            return new NivelResource($nivel);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }

    public function destroy(string $id)
    {
        try {
            $nivel = $this->nivelService->verificarNivel($id);
            $nivel->delete();
            return $this->responseService->sendSuccess('', '', 204);
        } catch (CustomRequestException $e) {
            return $e->render();
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->getCode() == 23000) {
                return $this->responseService->sendSuccess('error', 'Nível associado a um ou mais desenvolvedores. Não é possivel excluir', 400);
            }
        }
    }
}
