<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\CustomRequestException;
use App\Http\Controllers\Controller;
use App\Http\Requests\DesenvolvedorRequest;
use App\Http\Requests\PaginationRequest;
use App\Http\Resources\DesenvolvedorResource;
use App\Models\Desenvolvedor;
use App\Services\DesenvolvedorService;
use App\Services\PaginationService;
use App\Services\ResponseService;

class DesenvolvedorController extends Controller
{
    protected $desenvolvedorService;
    protected $responseService;
    protected $paginationService;

    public function __construct(
        DesenvolvedorService $desenvolvedorService,
        ResponseService $responseService,
        PaginationService $paginationService
    ) {
        $this->desenvolvedorService = $desenvolvedorService;
        $this->responseService = $responseService;
        $this->paginationService = $paginationService;
    }

    public function index(PaginationRequest $request)
    {
        $query = Desenvolvedor::with('nivel');
        $camposFiltrados = ['id', 'nome', 'hobby', 'sexo', 'nivel_id'];
        $result = $this->paginationService->paginate($request, $query, $camposFiltrados);

        try {
            $this->responseService->vericarRetorno(count($result['data']));
            return response()->json([
                'data' => DesenvolvedorResource::collection(collect($result['data'])),
                'meta' => $result['meta'],
            ]);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }

    public function store(DesenvolvedorRequest $request)
    {
        $data = $request->validated();
        $dev = Desenvolvedor::create($data);
        $dev->load('nivel');
        return new DesenvolvedorResource($dev);
    }

    public function show(string $id)
    {
        try {
            $dev = $this->desenvolvedorService->verificarDev($id);
            $dev->load('nivel');
            return new DesenvolvedorResource($dev);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }

    public function update(DesenvolvedorRequest $request, string $id)
    {
        try {
            $dev = $this->desenvolvedorService->verificarDev($id);
            $data = $request->validated();
            $dev->update($data);
            $dev->load('nivel');
            return new DesenvolvedorResource($dev);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }

    public function destroy(string $id)
    {
        try {
            $dev = $this->desenvolvedorService->verificarDev($id);
            $dev->delete();
            return $this->responseService->sendSuccess('', '', 204);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }
}
