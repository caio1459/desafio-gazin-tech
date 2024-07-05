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
use OpenApi\Annotations as OA;

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

    /**
     * @OA\Get(
     *     path="/api/niveis",
     *     summary="Lista todos os níveis",
     *     description="Retorna uma lista paginada de níveis",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Número da página",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="itens",
     *         in="query",
     *         description="Número de itens por página",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="sort",
     *         in="query",
     *         description="Campo que vai ser ordenado",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="order",
     *         in="query",
     *         description="Ordenação crescente (asc) ou descrescente (desc)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="id",
     *         in="query",
     *         description="Filtra pelo id do nível",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="nivel",
     *         in="query",
     *         description="Filtra pela descrição do nível",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de níveis",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Nivel")
     *             ),
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(
     *                     property="total",
     *                     type="integer",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="per_page",
     *                     type="integer",
     *                     example=2
     *                 ),
     *                 @OA\Property(
     *                     property="current_page",
     *                     type="integer",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="last_page",
     *                     type="integer",
     *                     example=1
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Requisição inválida"
     *     )
     * )
     */
    public function index(PaginationRequest $request)
    {
        $query = Nivel::query();
        $camposFiltrados = ['id', 'nivel'];
        $result = $this->paginationService->paginate($request, $query, $camposFiltrados);

        try {
            $result = $this->paginationService->paginate($request, $query, $camposFiltrados);
            return response()->json([
                'data' => NivelResource::collection(collect($result['data'])),
                'meta' => $result['meta'],
            ]);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/niveis",
     *     summary="Cria um novo nível",
     *     description="Cria um novo nível",
     *     tags={"Níveis"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Nivel")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Nível criado",
     *         @OA\JsonContent(ref="#/components/schemas/Nivel")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Requisição inválida"
     *     )
     * )
     */
    public function store(NivelRequest $request)
    {
        $data = $request->validated();
        $nivel = Nivel::create($data);
        return new NivelResource($nivel);
    }

    /**
     * @OA\Put(
     *     path="/api/niveis/{id}",
     *     summary="Atualiza um nível existente",
     *     description="Atualiza os dados de um nível existente",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID do nível",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Nivel")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nível atualizado",
     *         @OA\JsonContent(ref="#/components/schemas/Nivel")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/niveis/{id}",
     *     summary="Exclui um nível",
     *     description="Exclui um nível existente",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID do nível",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Nível excluído com sucesso"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Nível associado a desenvolvedores, não pode ser excluído"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
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
